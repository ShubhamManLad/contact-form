var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Hello");
const API = "https://671737b8b910c6a6e026fed0.mockapi.io/userData";
const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");
const submitButton = document.getElementById("submitButton");
function validateForm(name, email, phone, subject, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.innerText = "Please enter a valid email.";
        return false;
    }
    if (phone.length !== 10 || isNaN(Number(phone))) {
        responseMessage.innerText = "Please enter a valid 10-digit contact number.";
        return false;
    }
    if (name.trim().length == 0) {
        responseMessage.innerText = "Cannot leave Name empty!";
        return false;
    }
    if (subject.trim().length == 0) {
        responseMessage.innerText = "Cannot leave Subject empty!";
        return false;
    }
    if (message.trim().length == 0) {
        responseMessage.innerText = "Cannot leave Message empty!";
        return false;
    }
    return true;
}
contactForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    if (validateForm(name, email, phone, subject, message)) {
        try {
            submitButton.style.color = 'black';
            submitButton.disabled = true;
            const user = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
            };
            const response = yield fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            submitButton.disabled = false;
            submitButton.style.color = 'white';
            if (response.ok) {
                responseMessage.innerText = "Form Submitted Successfully!";
                contactForm.reset();
                console.log(response.json());
            }
            else {
                throw new Error("Failed to submit the form");
            }
        }
        catch (error) {
            responseMessage.innerText = "Submission Failed. Please try again.";
        }
    }
}));
