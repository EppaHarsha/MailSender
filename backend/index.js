const express=require("express");
const nodemailer=require("nodemailer");
const cors=require("cors");
const port=3000;
const app=express();
app.use(express.json());
app.use(cors());


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,         
  secure: false,       
  auth: {
    user: 'user-email',
    pass: 'user-email-App-Password'
  } 
});

app.post("/send",async(req,res)=>{
   const { senderName, receiverEmail, subject, message } = req.body;
   if(!senderName || !receiverEmail || !subject || !message){
    res.status(400).json({message:"Fill all the required fields"});
   }
   const mailOptions={
    from:"user-email",
    to:receiverEmail,
    subject:subject,
    text:message,
    html: `<h3>From: ${senderName}</h3><p>${message}</p>`
    };
     try{
        const info=await transporter.sendMail(mailOptions);
        console.log(info.response);
        res.status(200).json({ message: "Email sent successfully" });

    }catch(err){
        console.log(err);
        res.status(400).json({message:"mail not sended try again"});
    }
})

app.listen(port,()=>{
    console.log("server is running");
});