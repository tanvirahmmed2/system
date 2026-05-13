/**
 * Brevo (Sendinblue) Transactional Email Integration
 */

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_API_KEY = process.env.BREVO_API_KEY;

/**
 * Sends a transactional email reply.
 * @param {string} toEmail - Recipient email address
 * @param {string} toName - Recipient name
 * @param {string} subject - Email subject
 * @param {string} content - HTML content of the reply
 */
export async function sendBrevoReply(toEmail, toName, subject, content) {
  if (!BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not defined");
    return { success: false, error: "Missing API Key" };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Disibin Support",
          email: "support@disibin.com",
        },
        to: [{ email: toEmail, name: toName }],
        subject: subject,
        htmlContent: content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email via Brevo");
    }

    return { success: true };
  } catch (error) {
    console.error("Brevo Error:", error);
    return { success: false, error: error.message };
  }
}
