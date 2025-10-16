const toggle = document.querySelector('.toggle');
const navMenu = document.querySelector('.main-nav ul');

toggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
// For the contact 
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const reason = formData.get("reason");
    const message = formData.get("message");

    formData.set("message", `Reason for contact: ${reason}\n\n${message}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        form.reset();
        status.textContent = " Message sent successfully!";
        status.className = "form-status success";
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      status.textContent = " Something went wrong. Please try again.";
      status.className = "form-status error";
    }
  });
});