// // // app/api/send-email/route.ts
// // import { NextResponse } from "next/server";
// // import nodemailer from "nodemailer";

// // export async function POST(req: Request) {
// //   const { name, email, message } = await req.json();

// //   const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.EMAIL_USERNAME,
// //       pass: process.env.EMAIL_PASSWORD,
// //     },
// //   });

// //   const mailOptions = {
// //     from: email,
// //     to: "info@grude-online.info", // zamijeni s pravim emailom
// //     subject: `Nova poruka od ${name}`,
// //     text: `
// // Ime: ${name}
// // Email: ${email}

// // Poruka:
// // ${message}
// //     `,
// //   };

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     return NextResponse.json({ success: true });
// //   } catch (error) {
// //     console.error("Greška prilikom slanja:", error);
// //     return NextResponse.json({ success: false }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// //import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const title = formData.get("title") as string;
//     const content = formData.get("content") as string;
//     const images = formData.getAll("images") as File[];
//     const video = formData.get("video") as File | null;

//     // Ograničenje veličine videa (20 MB)
//     if (video && video.size > 20 * 1024 * 1024) {
//       return NextResponse.json(
//         { success: false, error: "Video je prevelik (max 20MB)." },
//         { status: 400 }
//       );
//     }

//     // SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: process.env.SMTP_SECURE === "true", // true za 465, false za ostalo
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // Priprema privitaka
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const attachments: any[] = [];

//     for (const file of images) {
//       attachments.push({
//         filename: file.name,
//         content: Buffer.from(await file.arrayBuffer()),
//       });
//     }

//     if (video) {
//       attachments.push({
//         filename: video.name,
//         content: Buffer.from(await video.arrayBuffer()),
//       });
//     }

//     // Slanje emaila
//     await transporter.sendMail({
//       from: `"Web Portal" <${process.env.SMTP_USER}>`,
//       to: process.env.EMAIL_TO,
//       subject: `Nova vijest: ${title}`,
//       text: content,
//       attachments,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Greška pri slanju emaila:", error);
//     return NextResponse.json(
//       { success: false, error: "Greška pri slanju." },
//       { status: 500 }
//     );
//   }
// }
