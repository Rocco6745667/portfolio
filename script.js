// This script can be used for future enhancements and interactivity.
// Currently, it includes an alert for the contact form submission.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
  });
});