// swaggerClient.js

// Base URL for the Swagger API
const API_BASE_URL = 'http://localhost:5678/api';

// Function for logging in
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Assuming the response contains a token or some indication of a successful login
        sessionStorage.setItem('isConnected', 'true'); // Store login state
        updateUIOnLoginState(); // Update the UI after successful login

        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

// Function to update UI based on login state
function updateUIOnLoginState() {
    const loginLink = document.querySelector('.login');
    const logoutLink = document.querySelector('.logout');
    const categories = document.querySelector('.categories');
    // const logoModifier = document.querySelector('.logo-modifier');
    const editionMod = document.querySelector('#logged');

    const isConnected = sessionStorage.getItem('isConnected');

    if (isConnected === 'true') {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
        categories.style.display = 'none';
        // logoModifier.style.display = 'block';
        editionMod.style.display = 'flex';
    } else {
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
        // logoModifier.style.display = 'none';
        editionMod.style.display = 'none';
    }
}

// Event listener for logout
function setupLogoutListener() {
    const logoutLink = document.querySelector('.logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.removeItem('isConnected');
            updateUIOnLoginState(); // Update UI after logout
            window.location.replace('index.html');
        });
    }
}

// Set up event listeners and initialize UI on DOM load
document.addEventListener('DOMContentLoaded', function () {
    updateUIOnLoginState(); // Update UI on page load based on login state
    setupLogoutListener(); // Set up the logout listener
});

// Export the functions to use them in other files
export { loginUser };
