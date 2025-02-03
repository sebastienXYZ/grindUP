import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const starsRef = useRef<THREE.Points>(null);
  const count = 5000; // Plus d'étoiles mais plus petites

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 150;     // Distribution plus large
    positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    sizes[i] = Math.random() * 0.5 + 0.1;               // Tailles plus petites
    opacities[i] = Math.random() * 0.5 + 0.1;          // Opacités variables
  }

  useFrame((state) => {
    if (!starsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.05;   // Mouvement plus lent
    
    starsRef.current.rotation.y = time * 0.02;
    starsRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={count}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        vertexShader={`
          attribute float size;
          attribute float opacity;
          varying float vOpacity;
          void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          void main() {
            float r = 0.0, delta = 0.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            float alpha = (1.0 - r) * 0.5 * vOpacity;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `}
      />
    </points>
  );
}

function ShootingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPosition = useRef({
    x: Math.random() * 40 - 20,
    y: Math.random() * 20 + 10,
    z: -10
  });
  const speed = useRef(Math.random() * 0.15 + 0.1);    // Vitesse réduite
  const delay = useRef(Math.random() * 8);             // Délai plus long
  const active = useRef(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    if (time > delay.current && !active.current) {
      meshRef.current.position.set(
        startPosition.current.x,
        startPosition.current.y,
        startPosition.current.z
      );
      active.current = true;
    }

    if (active.current) {
      meshRef.current.position.x -= speed.current;
      meshRef.current.position.y -= speed.current;

      if (meshRef.current.position.y < -10) {
        meshRef.current.position.set(
          Math.random() * 40 - 20,
          Math.random() * 20 + 10,
          -10
        );
        delay.current = time + Math.random() * 5 + 3;  // Délai plus variable
        active.current = false;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.02, 8, 8]} />           // Étoile filante plus petite
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      <mesh position={[0.1, 0.1, 0]}>
        <cylinderGeometry args={[0.001, 0.02, 0.3, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </mesh>
  );
}

export function VideoHero() {
  return (
    <div className="h-screen w-full absolute top-0 left-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 30, 150]} /> {/* Ajout de brouillard pour plus de profondeur */}
        
        <StarField />
        
        {Array.from({ length: 3 }).map((_, i) => (    // Moins d'étoiles filantes
          <ShootingStar key={i} />
        ))}
      </Canvas>
    </div>
  );
}