// Booking page - validation form

const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // User input in blank fields
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("book-button1").value;

    const message = document.getElementById("form-message");

    if (name === "" || surname === "" || phone === "" || email === "" || service === "") {
        message.textContent = "Please fill in all the fields and select an opetion.";
        message.style.color = "red";
        return;
    }

    // Name validator
    const formalName = /^[A-Za-z]+$/;

    if (!formalName.test(name)) {
        message.textContent = "Name must only contain letters.";
        message.style.color = "red";
        return;
    }
    
    // Surname validator
    const formalSurname = /^[A-Za-z]+$/;

    if (!formalSurname.test(surname)) {
        message.textContent = "Surname must only contain letters.";
        message.style.color = "red";
        return;
    }
    

    // Phone number validator
    const phoneCode = /^(0\d{9}|\+27\d{9})$/;

    if (!phoneCode.test(phone)) {
        message.textContent = "Invalid phone number. Please enter a valid South African phone number starting with either +27 or 0.";
        message.style.color = "red";
        return;
    }

    // Email validator
    const emailCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailCode.test(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
    }
    
    // Display message for passed validation
    message.textContent = "Details have been captured. Thank You.";
    message.style.color = "green";
});