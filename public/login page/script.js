function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    const universityNumber = document.getElementById('universityNumber').value;
    const message = document.getElementById('message');

    // Clear previous messages
    message.textContent = '';

    // Simple validation logic
    if (username === "" || password === "" || address === "" || universityNumber === "") {
        message.textContent = "All fields are required!";
        return false;
    }

    // Example: validating university number format (numeric)
    if (isNaN(universityNumber)) {
        message.textContent = "University number must be numeric!";
        return false;
    }

    // If all fields are valid, proceed with login (example)
    message.textContent = "Login successful!";
    message.style.color = 'green';
    return true;  // Allow form submission
}
