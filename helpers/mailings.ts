import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface LoginNotificationPayload {
    [key: string]: any; // Dynamic typing
}
  
export async function mailBodyGeneratorForLoginFail(emailtempletedata: any, dynamicarr: any): Promise<string> {
  return new Promise(async (resolve) => {
    let record = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Failed Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #121212; color: #ffffff;">
        <div style="max-width: 600px; background-color: #1e1e1e; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3); margin: 0 auto; border: 2px solid gold;">
          <div style="background: linear-gradient(45deg, #1c1c1c, #2c2c2c); border: 2px solid gold; padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center;">
            <h1 style="color: gold; font-size: 32px; margin: 0;">Print Tee Pal</h1>
          </div>
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #ffffff; font-size: 24px; margin: 0; padding: 10px 0; font-weight: bold; background-color: #ff5252; border-radius: 8px;">Login Failed Notification</h2>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 15px;">Dear <strong>Admin</strong>,</p>
            <p style="font-size: 15px;">We detected a failed login attempt on Print Tee Pal. Please review the details below.</p>
          </div>
          <div style="margin-bottom: 40px;">
            <div style="padding: 15px; border: 1px solid #ff5252; border-radius: 8px; background-color: #2a2a2a;">
              <p style="font-weight: bold; margin-bottom: 10px; text-decoration: underline; color: gold;">Failure Details:</p>
              <p style="font-size: 15px;"><strong>Reason for Failure:</strong> [[failure_reason]]</p>
              <p style="font-size: 15px;"><strong>User Email:</strong> [[user_email]]</p>
              <p style="font-size: 15px;"><strong>IP Address:</strong> [[ipInfo_ip]]</p>
              <p style="font-size: 15px;"><strong>Location:</strong> [[ipInfo_city]], [[ipInfo_region]], [[ipInfo_country]]</p>
              <p style="font-size: 15px;"><strong>Organization:</strong> [[ipInfo_org]]</p>
              <p style="font-size: 15px;"><strong>Postal Code:</strong> [[ipInfo_postal]]</p>
              <p style="font-size: 15px;"><strong>Attempted Login Time:</strong> [[login_time]]</p>
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <h4 style="font-size: 15px; color: #cccccc;">Please be cautious of any further suspicious activities.</h4>
          </div>
          <div style="margin-top: 20px;">
            <p style="font-size: 15px;">If you have any questions or need assistance, feel free to contact us.</p>
          </div>
          <div style="margin-top: 20px; font-size: 12px;">
            <p style="font-size: 15px;">Thank you,</p>
            <p style="font-size: 15px;">Print Tee Pal Security Team</p>
          </div>
        </div>
      </body>
      </html>
      `;

    // Replace dynamic placeholders
    for (let i of dynamicarr) {
      const entries = Object.entries(i);
      const templateKey = entries[0][0];
      const dataKey = entries[0][1] as string; // ✅ Cast as string

      const value = emailtempletedata[0][dataKey] ?? '';
      const placeholder = `[[${templateKey}]]`;
      record = record.split(placeholder).join(value);
    }

    resolve(record);
  });
}
export async function mailBodyGeneratorForLoginSuccess(emailtempletedata: any, dynamicarr: any): Promise<string> {
  return new Promise(async (resolve) => {
    let record = `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login Successful Notification</title>
      </head>

      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #121212; color: #ffffff;">

          <div style="max-width: 600px; background-color: #1e1e1e; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3); margin: 0 auto; border: 2px solid gold;">
              <div style="background: linear-gradient(45deg, #1c1c1c, #2c2c2c); border: 2px solid gold; padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center;">
                  <h1 style="color: gold; font-size: 32px; margin: 0;">Print Tee Pal</h1>
              </div>

              <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #ffffff; font-size: 24px; margin: 0; padding: 10px 0; font-weight: bold; background-color: #4caf50; border-radius: 8px;">Login Successful Notification</h2>
              </div>

              <div style="margin-bottom: 20px; text-align: center;">
                  <p style="font-size: 18px;">Congratulations <strong>Admin</strong>! 🎉😄</p>
                  <p style="font-size: 15px;">user with email id <strong>[[user_email]]</strong> have successfully logged into Print Tee Pal. We are excited !</p>
              </div>

              <div style="margin-bottom: 40px;">
                  <!-- Success Details -->
                  <div style="padding: 15px; border: 1px solid #4caf50; border-radius: 8px; background-color: #2a2a2a;">
                      <p style="font-weight: bold; margin-bottom: 10px; text-decoration: underline; color: gold;">Login Details:</p>
                      <p style="font-size: 15px;"><strong>User Email:</strong> [[user_email]]</p>
                      <p style="font-size: 15px;"><strong>IP Address:</strong> [[ipInfo_ip]]</p>
                      <p style="font-size: 15px;"><strong>Location:</strong> [[ipInfo_city]], [[ipInfo_region]], [[ipInfo_country]]</p>
                      <p style="font-size: 15px;"><strong>Organization:</strong> [[ipInfo_org]]</p>
                      <p style="font-size: 15px;"><strong>Postal Code:</strong> [[ipInfo_postal]]</p>
                      <p style="font-size: 15px;"><strong>Login Time:</strong> [[login_time]]</p>
                  </div>
              </div>

              <div style="margin-bottom: 20px;">
                  <h4 style="font-size: 15px; color: #cccccc;">Enjoy your session and stay productive!</h4>
              </div>

              <div style="margin-top: 20px;">
                  <p style="font-size: 15px;">If you have any questions or need assistance, feel free to contact us.</p>
              </div>

              <div style="margin-top: 20px; font-size: 12px;">
                  <p style="font-size: 15px;">Thank you,</p>
                  <p style="font-size: 15px;">Print Tee Pal Security Team</p>
              </div>
          </div>

      </body>

      </html>
      `;

    // Replace dynamic placeholders
    for (let i of dynamicarr) {
      const entries = Object.entries(i);
      const templateKey = entries[0][0];
      const dataKey = entries[0][1] as string; // ✅ Cast as string

      const value = emailtempletedata[0][dataKey] ?? '';
      const placeholder = `[[${templateKey}]]`;
      record = record.split(placeholder).join(value);
    }


    resolve(record);
  });
}
export async function mailBodyGeneratorForPasswordReset(emailtempletedata: any, dynamicarr: any): Promise<string> {
  return new Promise(async (resolve) => {
    let record = `
      <!DOCTYPE html>
          <html lang="en">

          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset Request</title>
          </head>

          <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #121212; color: #ffffff;">

              <div style="max-width: 600px; background-color: #1e1e1e; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3); margin: 0 auto; border: 2px solid gold;">
                  <div style="background: linear-gradient(45deg, #1c1c1c, #2c2c2c); border: 2px solid gold; padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center;">
                      <h1 style="color: gold; font-size: 32px; margin: 0;">Print Tee Pal</h1>
                  </div>

                  <div style="text-align: center; margin-bottom: 20px;">
                      <h2 style="color: #ffffff; font-size: 24px; margin: 0; padding: 10px 0; font-weight: bold; background-color: #4CAF50; border-radius: 8px;">Password Reset Request</h2>
                  </div>

                  <div style="margin-bottom: 20px;">
                      <p style="font-size: 15px;">Dear <strong>[[user_name]]</strong>,</p>
                      <p style="font-size: 15px;">We received a request to reset your password for your Print Tee Pal account. Click the button below to proceed.</p>
                  </div>

                  <div style="text-align: center; margin-bottom: 40px;">
                      <!-- Reset Password Button -->
                      <a href="[[resetLink]]" style="background-color: gold; color: #121212; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px;">Reset Password</a>
                  </div>

                  <div style="margin-bottom: 20px;">
                      <p style="font-size: 14px; color: #cccccc;">If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
                  </div>

                  <div style="margin-top: 20px;">
                      <p style="font-size: 15px;">For security reasons, this link will expire in [[expiration_time]] hours.</p>
                  </div>

                  <div style="margin-top: 20px; font-size: 12px;">
                      <p style="font-size: 15px;">Thank you,</p>
                      <p style="font-size: 15px;">Print Tee Pal Security Team</p>
                  </div>
              </div>

          </body>

          </html>
      `;

    // Replace dynamic placeholders
    for (let i of dynamicarr) {
      const entries = Object.entries(i);
      const templateKey = entries[0][0];
      const dataKey = entries[0][1] as string; // ✅ Cast as string

      const value = emailtempletedata[0][dataKey] ?? '';
      const placeholder = `[[${templateKey}]]`;
      record = record.split(placeholder).join(value);
    }


    resolve(record);
  });
}


export async function mailBodyGeneratorForNewOrder(emailtempletedata: any, dynamicarr: any): Promise<string> {
  return new Promise(async (resolve) => {
    let record = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #121212; color: #ffffff;">
          <div style="max-width: 600px; background-color: #1e1e1e; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3); margin: 0 auto; border: 2px solid gold;">
              <div style="background: linear-gradient(45deg, #1c1c1c, #2c2c2c); border: 2px solid gold; padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center;">
                  <h1 style="color: gold; font-size: 32px; margin: 0;">Print Tee Pal</h1>
              </div>

              <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #ffffff; font-size: 24px; margin: 0; padding: 10px 0; font-weight: bold; background-color: #4CAF50; border-radius: 8px;">New Order Notification</h2>
              </div>

              <div style="margin-bottom: 20px;">
                  <p style="font-size: 15px;">Dear <strong>[[admin_name]]</strong>,</p>
                  <p style="font-size: 15px;">A new order has just been placed at <strong>[[order_time]]</strong>.</p>
                  <p style="font-size: 15px;">Please log in to your admin panel to review the order details and take the necessary actions.</p>
              </div>

              <div style="text-align: center; margin-bottom: 40px;">
                  <!-- Admin Panel Button -->
                  <a href="[[admin_panel_link]]" style="background-color: gold; color: #121212; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px;">Check Admin Panel</a>
              </div>

              <div style="margin-top: 20px; font-size: 12px;">
                  <p style="font-size: 15px;">Thank you,</p>
                  <p style="font-size: 15px;">Print Tee Pal Team</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Replace dynamic placeholders
    for (let i of dynamicarr) {
      const entries = Object.entries(i);
      const templateKey = entries[0][0];
      const dataKey = entries[0][1] as string;
      const value = emailtempletedata[0][dataKey] ?? '';
      const placeholder = `[[${templateKey}]]`;
      record = record.split(placeholder).join(value);
    }

    resolve(record);
  });
}


export async function mailBodyGeneratorForPaymentInitiation(emailtempletedata: any, dynamicarr: any): Promise<string> {
  return new Promise(async (resolve) => {
    let record = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Initiated Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #121212; color: #ffffff;">
          <div style="max-width: 600px; background-color: #1e1e1e; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3); margin: 0 auto; border: 2px solid gold;">
              <div style="background: linear-gradient(45deg, #1c1c1c, #2c2c2c); border: 2px solid gold; padding: 15px; margin-bottom: 20px; border-radius: 8px; text-align: center;">
                  <h1 style="color: gold; font-size: 32px; margin: 0;">Print Tee Pal</h1>
              </div>

              <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #ffffff; font-size: 24px; margin: 0; padding: 10px 0; font-weight: bold; background-color: #2196F3; border-radius: 8px;">Payment Initiated</h2>
              </div>

              <div style="margin-bottom: 20px;">
                  <p style="font-size: 15px;">Dear <strong>[[admin_name]]</strong>,</p>
                  <p style="font-size: 15px;">A user has just initiated a payment on <strong>[[order_time]]</strong>.</p>
                  <p style="font-size: 15px;">Please review the payment details in the admin panel to ensure everything is proceeding smoothly.</p>
              </div>

              <div style="margin-bottom: 30px; background-color: #2a2a2a; padding: 15px; border-radius: 8px;">
                  <h3 style="color: gold; margin-bottom: 10px;">User Details</h3>
                  <p style="font-size: 15px;"><strong>Name:</strong> [[user_name]]</p>
                  <p style="font-size: 15px;"><strong>Email:</strong> [[user_email]]</p>
                  <p style="font-size: 15px;"><strong>Phone:</strong> [[user_phone]]</p>
              </div>

              <div style="text-align: center; margin-bottom: 40px;">
                  <a href="[[admin_panel_link]]" style="background-color: gold; color: #121212; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 16px;">Check Admin Panel</a>
              </div>

              <div style="margin-top: 20px; font-size: 12px;">
                  <p style="font-size: 15px;">Thank you,</p>
                  <p style="font-size: 15px;">Print Tee Pal Payment Team</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Replace dynamic placeholders
    for (let i of dynamicarr) {
      const entries = Object.entries(i);
      const templateKey = entries[0][0];
      const dataKey = entries[0][1] as string;
      const value = emailtempletedata[0][dataKey] ?? '';
      const placeholder = `[[${templateKey}]]`;
      record = record.split(placeholder).join(value);
    }

    resolve(record);
  });
}






  export async function sendEmail(data:any) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NOTIFICATION_EMAIL_USER!,  
        pass: process.env.NOTIFICATION_EMAIL_PASS!,  
      },
    });
  
    const mailOptions = {
      from: `"Printeepal - Do Not Reply" <${process.env.NOTIFICATION_EMAIL_USER}>`,
      to:data.recipients,
      cc:data.cc,
      bcc:data.bcc,
      subject:data.subject,
      html: data.body,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully! to:',data.recipients);
      console.log('Message ID:', info.messageId);
    } catch (error) {
      console.error('❌ Error sending email:', error);
    }
  }
