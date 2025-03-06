const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

const router = express.Router();

router.get("/progress", async (req, res) => {
    const { name = "Sasuke Uchiha", lvl = 10, exp = 750, avatar = "https://i.imgur.com/ZpijZpg.png" } = req.query;
    
    const canvas = createCanvas(700, 300);
    const ctx = canvas.getContext("2d");

    const backgroundPath = path.join(__dirname, "../public/background.jpg");
    const background = await loadImage(backgroundPath);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const userAvatar = await loadImage(avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 150, 80, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(userAvatar, 20, 70, 160, 160);
    ctx.restore();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 6;
    ctx.fillText(name, 200, 80);
    ctx.font = "bold 28px Arial";
    ctx.fillText(`Lv. ${lvl}`, 200, 120);

    const maxExp = 1000;
    const progressWidth = (exp / maxExp) * 350;
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(200, 140, 350, 25);
    ctx.fillStyle = "#00a2ff";
    ctx.shadowColor = "#00a2ff";
    ctx.shadowBlur = 10;
    ctx.fillRect(200, 140, progressWidth, 25);
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(`${exp} / ${maxExp} EXP`, 200, 175);

    res.setHeader("Content-Type", "image/png");
    canvas.createPNGStream().pipe(res);
});

module.exports = router;
