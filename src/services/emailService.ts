import sgMail from '@sendgrid/mail';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { EMAIL_CONFIG } from '../config/email';

sgMail.setApiKey(EMAIL_CONFIG.SENDGRID_API_KEY);

interface BetaSignup {
  email: string;
  status: 'pending' | 'active';
  createdAt: Date;
}

export const sendBetaWelcomeEmail = async (email: string): Promise<void> => {
  try {
    const msg = {
      to: email,
      from: {
        email: EMAIL_CONFIG.FROM_EMAIL,
        name: EMAIL_CONFIG.FROM_NAME
      },
      subject: EMAIL_CONFIG.TEMPLATES.BETA_WELCOME.SUBJECT,
      html: getBetaWelcomeTemplate(email),
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    };

    await sgMail.send(msg);
    console.log('Welcome email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    if (error.response) {
      console.error('SendGrid API error:', error.response.body);
    }
    throw new Error('Failed to send welcome email');
  }
};

export const subscribeToBeta = async (email: string): Promise<void> => {
  try {
    // Add to beta subscribers collection
    const betaRef = collection(db, 'beta_subscribers');
    await addDoc(betaRef, {
      email,
      status: 'active',
      createdAt: serverTimestamp()
    });

    // Send welcome email
    await sendBetaWelcomeEmail(email);
  } catch (error) {
    console.error('Error subscribing to beta:', error);
    throw error;
  }
};

const getBetaWelcomeTemplate = (email: string): string => {
  const { LOGO_URL, DASHBOARD_URL, SOCIAL_LINKS } = EMAIL_CONFIG.TEMPLATES.BETA_WELCOME;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue dans la Beta de Grindup!</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px; padding: 20px;">
            <img src="${LOGO_URL}" alt="Grindup Logo" style="width: 150px; height: auto;">
          </div>
          
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #9333EA; text-align: center; margin-bottom: 30px;">Bienvenue dans la Beta! 🚀</h1>
            
            <p style="margin-bottom: 20px;">Bonjour,</p>
            
            <p style="margin-bottom: 20px;">Merci d'avoir rejoint la beta de Grindup! Nous sommes ravis de vous compter parmi nos premiers utilisateurs.</p>
            
            <h2 style="color: #9333EA; margin: 30px 0 20px;">Prochaines étapes :</h2>
            
            <ol style="margin-bottom: 30px; padding-left: 20px;">
              <li style="margin-bottom: 10px;">Explorez notre plateforme</li>
              <li style="margin-bottom: 10px;">Découvrez nos fonctionnalités exclusives</li>
              <li style="margin-bottom: 10px;">Partagez vos retours avec nous</li>
            </ol>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${DASHBOARD_URL}" 
                 style="background: linear-gradient(to right, #9333EA, #C084FC);
                        color: white;
                        padding: 15px 30px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;">
                Accéder à mon espace
              </a>
            </div>
            
            <p style="margin-bottom: 30px;">À très bientôt sur Grindup!</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; color: #666;">
            <p style="margin-bottom: 15px;">Suivez-nous sur les réseaux sociaux :</p>
            <div>
              <a href="${SOCIAL_LINKS.INSTAGRAM}" style="color: #9333EA; margin: 0 10px; text-decoration: none;">Instagram</a>
              <a href="${SOCIAL_LINKS.TIKTOK}" style="color: #9333EA; margin: 0 10px; text-decoration: none;">TikTok</a>
              <a href="${SOCIAL_LINKS.TWITTER}" style="color: #9333EA; margin: 0 10px; text-decoration: none;">Twitter</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};