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

// Contact form endpoint
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Here you can add email sending logic or database storage
  console.log("Form submission:", { name, email, message });

  res.json({ success: true, message: "Message received!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//alert for the contact form submission.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
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
});
