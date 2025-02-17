// #region Navigating to and from Form Screen

function navigateToForm() {
    window.location.href = "/booknow.html";
}

//#endregion


// #region Collecting User Data
document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prepare the data payload
    const userData = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        message: message
    };

    try {
        // Send User data to the API
        try {
            const response = await fetch('https://miniwebapi.onrender.com/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'https://nailsxlauren.beauty'
                },
                body: JSON.stringify(userData),
            });
            console.log('User API Response:', response.status);
        } catch (userError) {
            console.error('User API Error:', userError);
        }

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
            console.log('Book API Response:', response2.status);

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
                    title: "Failed to Register",
                    text: "There was an error.",
                });
                console.error('Error:', response2.statusText);
            }
        } catch (bookError) {
            console.error('Book API Error:', bookError);
        }

    } catch (error) {
        console.error('Overall Network error:', error);
    }
});
//#endregion collecting data end