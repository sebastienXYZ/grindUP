interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, className = '', ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={`text-gray-200 hover:text-[#25F4EE] transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}