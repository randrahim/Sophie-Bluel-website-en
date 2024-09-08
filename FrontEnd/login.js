// Fetch login info from the API
async function fetchLogin(email, password) {
  try {
    const url = 'http://localhost:5678/api/users/login';
    console.log('Fetching from:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid login credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
}

// Handle the form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const loginErrorElement = document.getElementById('loginError');

  try {
    loginErrorElement.style.display = 'none';
    loginErrorElement.textContent = '';

    const loginData = await fetchLogin(email, password);
    console.log('Login successful:', loginData);

    window.location.href = 'index.html'; // Redirect after successful login
  } catch (error) {
    loginErrorElement.textContent = error.message;
    loginErrorElement.style.display = 'block';
  }
});
