console.log("Hello");

const API = "https://671737b8b910c6a6e026fed0.mockapi.io/userData";

const contactForm = document.getElementById("contactForm") as HTMLFormElement;
const responseMessage = document.getElementById("responseMessage") as HTMLParagraphElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

function validateForm(name: string, email: string, phone: string, subject: string, message: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.innerText = "Please enter a valid email.";
        return false;
    }
    if (phone.length !== 10 || isNaN(Number(phone))) {
        responseMessage.innerText = "Please enter a valid 10-digit contact number.";
        return false;
    }
    if (name.trim().length==0){
        responseMessage.innerText = "Cannot leave Name empty!";
        return false;
    }
    if (subject.trim().length==0){
        responseMessage.innerText = "Cannot leave Subject empty!";
        return false;
    }
    if (message.trim().length==0){
        responseMessage.innerText = "Cannot leave Message empty!";
        return false;
    }
    return true;
}

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const subject = (document.getElementById("subject") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLTextAreaElement).value;
    if(validateForm(name, email, phone, subject, message)){
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
    
            const response = await fetch(API, {
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
            } else {
                throw new Error("Failed to submit the form");
            }
        } catch (error) {
            responseMessage.innerText = "Submission Failed. Please try again.";
        }
    }
})