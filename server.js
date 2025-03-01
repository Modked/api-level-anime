const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// API Route to generate user progress image
app.get("/user/progress", async (req, res) => {
    const { name = "Sasuke Uchiha", lvl = 10, exp = 750, avatar = "https://i.imgur.com/ZpijZpg.png" } = req.query;
    
    const canvas = createCanvas(700, 300);
    const ctx = canvas.getContext("2d");
    
    try {
        // Load background (Sasuke theme)
        const background = await loadImage("https://i.imgur.com/dJZbE1K.jpg"); // Dark, blue-themed background
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        // Load user avatar
        const userAvatar = await loadImage(avatar);
        ctx.save();
        ctx.beginPath();
        ctx.arc(100, 150, 80, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(userAvatar, 20, 70, 160, 160);
        ctx.restore();
        
        // Draw Level & Name Text with Shadow Effect
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px 'Arial Black'";
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fillText(name, 200, 80);
        ctx.font = "bold 28px 'Arial'";
        ctx.fillText(`Lv. ${lvl}`, 200, 120);
        
        // EXP Bar Background (Futuristic Blue Effect)
        const maxExp = 1000;
        const progressWidth = (exp / maxExp) * 350;
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.fillRect(200, 140, 350, 25);
        ctx.fillStyle = "#00a2ff";
        ctx.shadowColor = "#00a2ff";
        ctx.shadowBlur = 10;
        ctx.fillRect(200, 140, progressWidth, 25);
        ctx.shadowBlur = 0;
        
        // EXP Text
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px Arial";
        ctx.fillText(`${exp} / ${maxExp} EXP`, 200, 175);
        
        // Uchiha Clan Symbol (Small Touch)
        const uchihaSymbol = await loadImage("https://i.imgur.com/6KixuAl.png");
        ctx.globalAlpha = 0.3;
        ctx.drawImage(uchihaSymbol, 540, 50, 120, 120);
        ctx.globalAlpha = 1;
        
        // Send Image Response
        res.setHeader("Content-Type", "image/png");
        canvas.createPNGStream().pipe(res);
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => console.log(`🔥 API Running on port ${PORT} - Sasuke Uchiha Theme! 🔥`));
