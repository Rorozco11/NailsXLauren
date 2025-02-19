// #region Navigating to and from Form Screen

function navigateToForm() {
    window.location.href = "/booknow.html";
}

//#endregion


// #region Collecting User Data
document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect and sanitize form data
    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address",
        });
        return;
    }

    // Prepare the sanitized data payload
    const userData = {
        fullName: fullName.replace(/['"]/g, ''), // Remove quotes
        phoneNumber: phoneNumber.replace(/['"]/g, ''),
        email: email.replace(/['"]/g, ''),
        message: message.replace(/['"]/g, '')
    };

    try {
        // Show loading spinner
        Swal.fire({
            title: 'Sending request...',
            text: 'Please wait',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Send Book data to the API
        try {
            const response2 = await fetch('https://miniwebapi.onrender.com/api/Book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'https://nailsxlauren.beauty'
                },
                body: JSON.stringify(userData)
            });
            
            if (response2.ok) {
                const emailResult = await response2.json();
                Swal.fire({
                    icon: "success",
                    title: "Sent!",
                    text: "NailsXLauren has been notified!",
                    showConfirmButton: false,
                    timer: 3000
                });
                console.log('Server response:', emailResult);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to book",
                    text: "There was an error.",
                });
                console.error('Error:', response2.statusText);
            }
        } catch (bookError) {
            console.error('Book API Error:', bookError);
            // Show error alert if request fails
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was a problem sending your request. Please try again.",
            });
        }

    } catch (error) {
        console.error('Overall Network error:', error);
        // Show error alert if request fails
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was a problem sending your request. Please try again.",
        });
    }
});
//#endregion collecting data end