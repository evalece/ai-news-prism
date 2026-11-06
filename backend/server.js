const express = require("express");
const cors = require("cors");

const newsRoutes = require("./routes/newsRoutes");
const healthRoutes = require("./routes/healthRoutes");



const app = express();

app.use(cors());
app.use(express.json());

// Mount news routes
app.use("/api/news", newsRoutes);
app.use("/api/sources", healthRoutes);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🐚 AI News backend running on port ${PORT}`);
});