const express = require("express");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Form submission:", { name, email, message });
    res.json({ success: true, message: "Message received!" });
  });

  // Let Next.js handle all other routes
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
