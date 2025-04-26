import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface LoginNotificationPayload {
    [key: string]: any; // Dynamic typing
}
  
export async function mailBodyGenerator(emailtempletedata: any, dynamicarr: any, templatepath: any): Promise<String> {

    return new Promise((resolve) => {
    //   const filePath = path.join(__dirname, templatepath);
    const filePath = path.resolve(__dirname, templatepath);
    console.log('Resolved file path:', filePath);
      console.log('filePath~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', filePath, __dirname, templatepath)
      fs.readFile(
        filePath,
        {
          encoding: "utf-8",
        },
        async function (err, data_for_html) {
          //  console.log(data_for_html, "data_for_html");
          // return

          if (!err) {
            let record = data_for_html;
            // console.log(data_for_html,err, "data_for_html");

            for (let i in dynamicarr) {
              let v = dynamicarr[i];
              let v1: any = Object.entries(v)
              let v2: any = Object.keys(v)
              console.log("v", v1, v1[0], v, v2, v1[0][0], v1[0][1])
              record = await record
                .split("[[" + v1[0][0] + "]]")
                .join(emailtempletedata[0][v1[0][1]]);
              console.log("++", "[[" + v1[0][0] + "]]", emailtempletedata[0][v1[0][1]])
            }


            console.log("record++++++", record);
            resolve(record)
          } else {
            console.log('++++', err)
          }
        }
      );
    })
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
