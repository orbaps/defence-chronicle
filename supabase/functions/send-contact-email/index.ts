import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save message");
    }

    console.log("Message saved to database");

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Amarendra <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: #22c55e; margin: 0; font-size: 24px;">🛡️ Message Received</h1>
          </div>
          
          <div style="padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #22c55e;">
            <p style="font-size: 16px; color: #1e293b; margin: 0 0 15px 0;">
              Hello <strong>${name}</strong>,
            </p>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 15px 0;">
              Thank you for reaching out! I've received your message regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.
            </p>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0;">
              I typically respond within 24-48 hours.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
              Best regards,<br>
              <strong>Amarendra Pratap Singh</strong><br>
              Defence Technology & AI Researcher
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent to user:", userEmailResponse);

    // Send notification email to admin (you)
    const notificationEmailResponse = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["amarendrapratapsingh.2004@gmail.com"],
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: #22c55e; margin: 0; font-size: 24px;">📬 New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${email}" style="color: #22c55e;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Subject:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #22c55e;">
            <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 14px;">Message:</h3>
            <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; padding: 12px 24px; background: #22c55e; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    console.log("Notification email sent to admin:", notificationEmailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
