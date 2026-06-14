
function sendMail(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const params = {
        from_name: name,
        subject: subject,
        message: message,
        reply_to: "madudilshan47@gmail.com"
    };

    const serviceID = "service_zu36qn4";
    const templateID = "template_c1xb4wt";
    const publicKey = "1PWgO7E780XrheuF5";


    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message was sent successfully!");
        })
        .catch(err => {
            console.log(err);
            alert("Failed to send the message. Please check your EmailJS configuration.");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", sendMail);
    }
});
