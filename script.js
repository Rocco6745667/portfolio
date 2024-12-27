const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Route for main index page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Route for about page
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

// Route for projects page
app.get("/projects", (req, res) => {
  res.sendFile(__dirname + "/public/projects.html");
});

// Route for contact page
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

// Contact form endpoint
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Form submission:", { name, email, message });
  res.json({ success: true, message: "Message received!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`
    Available routes:
    Main page: http://localhost:${port}
    About page: http://localhost:${port}/about
    Projects page: http://localhost:${port}/projects
    Contact page: http://localhost:${port}/contact
  `);
});

// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      try {
        const response = await fetch("http://localhost:3000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        alert("Thank you for reaching out! I'll get back to you soon.");
        form.reset();
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error sending your message. Please try again.");
      }
    });
  }
});
