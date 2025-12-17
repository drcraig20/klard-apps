/**
 * Email service for sending transactional emails.
 * Currently logs to console - swap implementation for production (Resend, SendGrid, SES, etc.)
 */

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Sends an email. Currently logs to console for development.
 * Replace this implementation with a real email provider for production.
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const { to, subject, text, html } = options;

  console.log("\n----------------------------------------");
  console.log(`EMAIL TO: ${to}`);
  console.log(`SUBJECT: ${subject}`);
  if (text) {
    console.log(`TEXT: ${text}`);
  }
  if (html) {
    console.log(`HTML: ${html}`);
  }
  console.log("----------------------------------------\n");
}
