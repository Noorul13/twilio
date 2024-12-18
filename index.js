const express = require("express");
const app = express();
const phoneVerificationRoutes = require("./routes/phoneVerificationRoutes");

app.use(express.json());
app.use("/api/phone-verification", phoneVerificationRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
