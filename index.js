import { createCanvas, loadImage } from "canvas";

export default async function handler(req, res) {
    const { name = "Sasuke Uchiha", lvl = 10, exp = 750, avatar = "https://i.imgur.com/ZpijZpg.png" } = req.query;

    const canvas = createCanvas(700, 300);
    const ctx = canvas.getContext("2d");

    // تحميل الخلفية (تصميم ساسكي)
    const background = await loadImage("https://files.catbox.moe/aw82td.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // تحميل صورة المستخدم
    const userAvatar = await loadImage(avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 150, 80, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(userAvatar, 20, 70, 160, 160);
    ctx.restore();

    // كتابة النصوص
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 6;
    ctx.fillText(name, 200, 80);
    ctx.font = "bold 28px Arial";
    ctx.fillText(`Lv. ${lvl}`, 200, 120);

    // شريط التقدم (EXP Bar)
    const maxExp = 1000;
    const progressWidth = (exp / maxExp) * 350;
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(200, 140, 350, 25);
    ctx.fillStyle = "#00a2ff";
    ctx.shadowColor = "#00a2ff";
    ctx.shadowBlur = 10;
    ctx.fillRect(200, 140, progressWidth, 25);
    ctx.shadowBlur = 0;

    // كتابة عدد الـ EXP
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(`${exp} / ${maxExp} EXP`, 200, 175);

    // رمز عشيرة اليوتشيها
    const uchihaSymbol = await loadImage("https://files.catbox.moe/tujjoy.jpg");
    ctx.globalAlpha = 0.3;
    ctx.drawImage(uchihaSymbol, 540, 50, 120, 120);
    ctx.globalAlpha = 1;

    // إرسال الصورة كاستجابة
    res.setHeader("Content-Type", "image/png");
    res.end(canvas.toBuffer("image/png"));
}
