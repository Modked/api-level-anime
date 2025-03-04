import { createCanvas, loadImage } from "canvas";

export default async function handler(req, res) {
    const { name = "Sasuke Uchiha", lvl = 10, exp = 750, avatar = "https://i.imgur.com/ZpijZpg.png" } = req.query;

    const canvas = createCanvas(700, 300);
    const ctx = canvas.getContext("2d");

    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø®Ù„ÙÙŠØ© (ØªØµÙ…ÙŠÙ… Ø³Ø§Ø³ÙƒÙŠ)
    const background = await loadImage("https://files.catbox.moe/aw82td.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // ØªØ­Ù…ÙŠÙ„ ØµÙˆØ±Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…
    const userAvatar = await loadImage(avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 150, 80, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(userAvatar, 20, 70, 160, 160);
    ctx.restore();

    // ÙƒØªØ§Ø¨Ø© Ø§Ù„Ù†ØµÙˆØµ
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 6;
    ctx.fillText(name, 200, 80);
    ctx.font = "bold 28px Arial";
    ctx.fillText(`Lv. ${lvl}`, 200, 120);

    // Ø´Ø±ÙŠØ· Ø§Ù„ØªÙ‚Ø¯Ù… (EXP Bar)
    const maxExp = 1000;
    const progressWidth = (exp / maxExp) * 350;
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(200, 140, 350, 25);
    ctx.fillStyle = "#00a2ff";
    ctx.shadowColor = "#00a2ff";
    ctx.shadowBlur = 10;
    ctx.fillRect(200, 140, progressWidth, 25);
    ctx.shadowBlur = 0;

    // ÙƒØªØ§Ø¨Ø© Ø¹Ø¯Ø¯ Ø§Ù„Ù€ EXP
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(`${exp} / ${maxExp} EXP`, 200, 175);

    // Ø±Ù…Ø² Ø¹Ø´ÙŠØ±Ø© Ø§Ù„ÙŠÙˆØªØ´ÙŠÙ‡Ø§
    const uchihaSymbol = await loadImage("https://files.catbox.moe/tujjoy.jpg");
    ctx.globalAlpha = 0.3;
    ctx.drawImage(uchihaSymbol, 540, 50, 120, 120);
    ctx.globalAlpha = 1;

    // Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„ØµÙˆØ±Ø© ÙƒØ§Ø³ØªØ¬Ø§Ø¨Ø©
    res.setHeader("Content-Type", "image/png");
    res.end(canvas.toBuffer("image/png"));
}
