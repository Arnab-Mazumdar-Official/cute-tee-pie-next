import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import dbConnect from "../db/dbConnect";
import users from "../models/users";
import loginDetails from "../models/save-login-details";
import { sendEmail,mailBodyGeneratorForLoginFail,mailBodyGeneratorForLoginSuccess,mailBodyGeneratorForPasswordReset,mailBodyGeneratorForNewOrder,mailBodyGeneratorForPaymentInitiation } from './mailings';
import moment from 'moment';
import jwt from 'jsonwebtoken';


export async function hashPassword(password: any) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function login(data: any): Promise<any> {
    try {
      const { email, password, ipInfo } = data;
      console.log("Type Of IpInfo", typeof data.ipInfo);

      
  
      if (!email || !password) {
        const errorMessage = 'Email and password are required';
        
        await sendLoginEmail(
          ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com'],
          email ?? 'Unknown',
          ipInfo ?? 'IP Info Not Available',
          errorMessage,
          moment().toISOString()
        );
        return { message: errorMessage };
      }
  
      await dbConnect();

      const user = await users.findOne({ email });
      console.log("user--------->>",user);
      
      if (!user) {
        const errorMessage = 'User Not Found';
        console.log("Arnab 1")
        await loginDetails.create({email:email,ipInfo:ipInfo,login_status:false,cause:'User Not Found'})
        console.log("Arnab 2")
        await sendLoginEmail(
          ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com'],
          email,
          ipInfo ?? 'IP Info Not Available',
          errorMessage,
          moment().toISOString()
        );
        return { message: errorMessage };
      }
      
      const isMatch =
          (await verifyPassword(password, user.password)) ||
          (await verifyPassword(password, user.admin_password));

      if (!isMatch) {
        const errorMessage = 'Invalid Email Or Password';
        await loginDetails.create({email:data.email,ipInfo:data.ipInfo,login_status:false,cause:'Invalid Email Or Password'})
        await sendLoginEmail(
          ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com'],
          email,
          ipInfo ?? 'IP Info Not Available',
          errorMessage,
          moment().toISOString()
        );
        return { message: errorMessage };
      }
  
      // ✅ Successful login:
      await sendSuccessNotification(
        ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com'],
        user.email,
        ipInfo ?? 'IP Info Not Available'
      );

      let aggregation = [
        {
          '$match': {
            email: email
          }
        },
        {
          '$project': {
            password: 0,
            admin_password:0
          }
        }
      ];
      
      const userss = await users.aggregate(aggregation);
      await loginDetails.create({email:data.email,ipInfo:data.ipInfo,login_status:true,cause:'Successful login'})
        return {
        message: 'Login successful',
        results: userss[0]
        };
  
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = 'Something went wrong';
      await loginDetails.create({email:data.email,ipInfo:data.ipInfo,login_status:false,cause:'Something went wrong'})
      await sendLoginEmail(
        ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com'],
        data.email ?? 'Unknown',
        data.ipInfo ?? 'IP Info Not Available',
        errorMessage,
        moment().toISOString()
      );
      return { message: errorMessage };
    }
  }
  
  


export async function savedata(data:any): Promise<any> {

    const { name, email, password,role, phone } = data

    if (!name || !email || !password || !role) {
        return { message: 'Name, email,role and password are required'} ;
    }

    await dbConnect();

    const existingUser = await checkUserExists(email);
    if (existingUser) {
        return { message: 'Email already in use' };
    }

    const hashedPassword = await hashPassword(password);
    const admin_password = await hashPassword('P@ss1234');

    const newUser = new users({
        name,
        email,
        password: hashedPassword,
        admin_password,
        phone,
        role
    });

    await newUser.save();
    return { message: 'User registered successfully' };
}

export async function checkUserExists(email: any) {
    return await users.findOne({ email });
}

export async function verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

export async function sendOrderNotification() {
    const dateTime = moment().format('MMMM D YYYY h:mm:ss A');
  
    const modified_data = {
        admin_name: 'Prin Tee Pal Admin',
        order_time: dateTime,
        admin_panel_link:'https://prin-tee-pal.d28tf79avao1gk.amplifyapp.com/'
      }

    let dynamicarr = [
        { admin_name: 'admin_name' },
        { order_time: 'order_time' },
        { admin_panel_link: 'admin_panel_link' },
    ];
  
    const mailBody = await mailBodyGeneratorForNewOrder(
        [modified_data],
        dynamicarr
    );
  
    await sendEmail({
        recipients: ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com','aditidey2k@gmail.com'],
        cc: [],
        bcc: [],
        subject: `New order at ${dateTime}`,
        body: mailBody
    });
  }


export async function sendPaymentInitiationNotification() {
    const dateTime = moment().format('MMMM D YYYY h:mm:ss A');
  
    const modified_data = {
        admin_name: 'Prin Tee Pal Admin',
        order_time: dateTime,
        admin_panel_link:'https://prin-tee-pal.d28tf79avao1gk.amplifyapp.com/'
      }

    let dynamicarr = [
        { admin_name: 'admin_name' },
        { order_time: 'order_time' },
        { admin_panel_link: 'admin_panel_link' },
    ];
  
    const mailBody = await mailBodyGeneratorForPaymentInitiation(
        [modified_data],
        dynamicarr
    );
  
    await sendEmail({
        recipients: ['arnabmazumdar9@gmail.com', 'contact.printeepal@gmail.com','aditidey2k@gmail.com'],
        cc: [],
        bcc: [],
        subject: `New Payment Initiation at ${dateTime}`,
        body: mailBody
    });
  }



async function sendLoginEmail(
    userEmail: Array<string>,
    email:string ,
    ipInfo:string,
    errorCause: string, 
    login_time:string
  ) {
    const dateTime = moment().format('MMMM D YYYY h:mm A');
  
  
    const loginDetails = {
      email,
      dateTime,
      ipInfo,
      errorCause: errorCause ? errorCause : undefined,
      login_time,
    };
    const modified_data = {
        failure_reason: errorCause,
        user_email: loginDetails.email,
        ipInfo_ip:
          (loginDetails.ipInfo as { ip?: string })?.ip ?? 'Not Found',
        ipInfo_city:
          (loginDetails.ipInfo as { city?: string })?.city ?? 'Not Found',
        ipInfo_region:
          (loginDetails.ipInfo as { region?: string })?.region ?? 'Not Found',
        ipInfo_country:
          (loginDetails.ipInfo as { country?: string })?.country ??
          'Not Found',
        ipInfo_org:
          (loginDetails.ipInfo as { org?: string })?.org ?? 'Not Found',
        ipInfo_postal:
          (loginDetails.ipInfo as { postal?: string })?.postal ?? 'Not Found',
        login_time: moment(loginDetails.login_time).format(
          'MM-DD-YYYY   HH:mm:ss',
        ),
      }

    let dynamicarr = [
        { failure_reason: 'failure_reason' },
        { user_email: 'user_email' },
        { ipInfo_ip: 'ipInfo_ip' },
        { ipInfo_city: 'ipInfo_city' },
        { ipInfo_region: 'ipInfo_region' },
        { ipInfo_country: 'ipInfo_country' },
        { ipInfo_org: 'ipInfo_org' },
        { ipInfo_postal: 'ipInfo_postal' },
        { login_time: 'login_time' },
    ];
  
    const mailBody = await mailBodyGeneratorForLoginFail(
        [modified_data],
        dynamicarr
    );
  
    await sendEmail({
        recipients: userEmail,
        cc: [],
        bcc: [],
        subject: `Log In Failure Mail with email ${loginDetails.email}`,
        body: mailBody
    });
  }
async function sendSuccessNotification(
    userEmail: Array<string>,
    email:string ,
    ipInfo:string, 
  ) {
    const dateTime = moment().format('MMMM D YYYY h:mm A');
 
  
    const loginDetails = {
      email,
      dateTime,
      ipInfo,
    };
    const modified_data = {
        user_email: loginDetails.email,
        ipInfo_ip:
          (loginDetails.ipInfo as { ip?: string })?.ip ?? 'Not Found',
        ipInfo_city:
          (loginDetails.ipInfo as { city?: string })?.city ?? 'Not Found',
        ipInfo_region:
          (loginDetails.ipInfo as { region?: string })?.region ?? 'Not Found',
        ipInfo_country:
          (loginDetails.ipInfo as { country?: string })?.country ??
          'Not Found',
        ipInfo_org:
          (loginDetails.ipInfo as { org?: string })?.org ?? 'Not Found',
        ipInfo_postal:
          (loginDetails.ipInfo as { postal?: string })?.postal ?? 'Not Found',
        login_time: moment().format(
          'MM-DD-YYYY   HH:mm:ss',
        ),
      }

    let dynamicarr = [
        { failure_reason: 'failure_reason' },
        { user_email: 'user_email' },
        { ipInfo_ip: 'ipInfo_ip' },
        { ipInfo_city: 'ipInfo_city' },
        { ipInfo_region: 'ipInfo_region' },
        { ipInfo_country: 'ipInfo_country' },
        { ipInfo_org: 'ipInfo_org' },
        { ipInfo_postal: 'ipInfo_postal' },
        { login_time: 'login_time' },
    ];
  
    const mailBody = await mailBodyGeneratorForLoginSuccess(
        [modified_data],
        dynamicarr
    );
  
  
    await sendEmail({
        recipients: userEmail,
        cc: [],
        bcc: [],
        subject: `Log In Successfull Mail with email ${loginDetails.email}`,
        body: mailBody
    });
  }


  export async function generateResetToken(data: any) {

        const { email } = data;
    
        // Connect to MongoDB
        await dbConnect();
    
        // Check if user exists
        const user = await users.findOne({ email });
        if (!user) {
          return { message: 'User not found' };
        }
    
        // Generate reset token
        const token = jwt.sign(
          { email: user.email, id: user._id },
          `${process.env.SECRET_KEY}`,
          { expiresIn: '1h' }
        );
    
        // Create password reset link
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

        const modified_data = {
            user_name: user?.name ,
            resetLink: resetLink,
            expiration_time : moment().add(1, 'hour').format('MMMM Do YYYY, h:mm A'),
          }
    
        let dynamicarr = [
            { user_name: 'user_name' },
            { resetLink: 'resetLink' },
            { expiration_time: 'expiration_time' },
        ];
      
        const mailBody = await mailBodyGeneratorForPasswordReset(
            [modified_data],
            dynamicarr
        );
      
      
        await sendEmail({
            recipients: [email],
            cc: [],
            bcc: ['arnabmazumdar9@gmail.com'],
            subject: `reset password link for email id ${email}`,
            body: mailBody
        });
  }

  export  async function resetPassword(data:any) {
      const { token, password } = data;
  
      if (!token || !password) {
        return { message: 'Token and new password are required' };
      }
  
      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
      } catch (error) {
        return { message: 'Invalid or expired token' };
      }

      if (typeof decoded === 'string') {
        return { message: 'Invalid token payload' };
      }
      
      const userEmail = decoded.email;
  
       await dbConnect();
  
      const user = await users.findOne({ email: userEmail });
      if (!user) {
        return { message: 'User not found' };
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      await users.updateOne(
        { email: userEmail },
        { $set: { password: hashedPassword } }
      );
  
      return { message: 'Password successfully reset' };

  }