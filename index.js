const express = require("express");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("🔥 API is running! Visit /user/progress");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
