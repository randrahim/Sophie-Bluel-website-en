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
        return data; // Typically, you'd get a token or user information
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

// Export the functions to use them in other files
// export { loginUser };
