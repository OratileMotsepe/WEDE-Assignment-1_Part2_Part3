// Booking page - validation form

const bookingForm = document.getElementById("booking-form");

// Error message elements
const nameError = document.getElementById("name-error");
const surnameError = document.getElementById("surname-error");
const phoneError = document.getElementById("phone-error");
const emailError = document.getElementById("email-error");
const serviceError = document.getElementById("service-error");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // User input in blank fields
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("book-button1").value;

    const message = document.getElementById("form-message");

    nameError.textContent = "";
    surnameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    serviceError.textContent = "";
    message.textContent = "";

    // Checks if fields are empty
    if (name === "") {
        nameError.textContent = "Please enter your name.";
    }

    if (surname === "") {
        surnameError.textContent = "Please enter your surname";
    }

    if (phone === "") {
        phoneError.textContent = "Please enter your phone number";
    }

    if (email === "") {
        emailError.textContent = "Please enter your email address";
    }

    if (service === "") {
        serviceError.textContent = "Please select a service";
    }

    if (name === "" || surname === "" || phone === "" || email === "" || service === "") {
        return;
    }

    // Name validator
    const formalName = /^[A-Za-z]+$/;

    if (!formalName.test(name)) {
        nameError.textContent = "Invalid entry. Name must only contain letters.";
        return;
    }
    
    // Surname validator
    const formalSurname = /^[A-Za-z]+$/;

    if (!formalSurname.test(surname)) {
        surnameError.textContent = "Invalid entry. Surname must only contain letters.";
        return;
    }
    

    // Phone number validator
    const phoneCode = /^(0\d{9}|\+27\d{9})$/;

    if (!phoneCode.test(phone)) {
        phoneError.textContent = "Invalid phone number. Please enter a valid South African phone number starting with either +27 or 0.";
        return;
    }

    // Email validator
    const emailCode = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailCode.test(email)) {
        emailError.textContent = "Invalid email. Please enter a valid email address.";
        return;
    }
    
    // Display message for passed validation
    message.textContent = "Details have been captured. Thank You.";
    message.style.color = "green";
});