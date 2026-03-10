import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASS
    }
});

export const sendVerifcationMail = async ({ email, link }: { email: string, link: string }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_SERVER_USER,
            to: email,
            subject: "Verify Your Email",
            html: `
             <p>Click below to verify your email:</p>
            <a href="${link}">Verify Email </a>
            `
        })
    } catch (error) {
        console.error("Email error:", error);
    }
};