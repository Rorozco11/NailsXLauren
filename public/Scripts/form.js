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
        // Send data to the API
        const response = await fetch('http://localhost:5000/api/User', { // Adjust the URL to match your API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const response2 = await fetch("http://localhost:5000/api/Book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
                title: "Failed to Register Email",
                text: "There was an error sending the email.",
            });
            console.error('Error:', response2.statusText);
        }

        // if (response.ok) {
        //     const result = await response.json();
        //     Swal.fire({
        //         icon: "success",
        //         title: "User Sent to API!",
        //         text: "User successfully registered in the system.",
        //         showConfirmButton: false,
        //         timer: 3000
        //     });
        //     console.log('Server response:', result);
        // } else {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Failed to Register User",
        //         text: "There was an issue registering the user.",
        //     });
        //     console.error('Error:', response.statusText);
        // }

    } catch (error) {
        console.error('Network error:', error);
    }
});
//#endregion collecting data end