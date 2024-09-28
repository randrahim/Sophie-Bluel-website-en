// Fetch login info from the API
async function fetchLogin(email, password) {
  const token = sessionStorage.getItem('token');

  const email = 'sophie.bluel@test.tld';
  const password = 'S0phie';

  try {
    const url = 'http://localhost:5678/api/users/login';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // Add Authorization header
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Rand Testing fetchLogin email', email)
    console.log('Rand Testing fetchLogin password', password)

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Rand Testing errorData', errorData)
      throw new Error(errorData.message || 'Invalid login credentials');
    }

    const data = await response.json();
    console.log('Rand Testing Login data', data);

    // Store the token in sessionStorage
    sessionStorage.setItem('token', data.token); // Assuming the token is in `data.token`

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

  console.log('Rand Testing addEventListener email', email)
  console.log('Rand Testing addEventListener password', password)

  try {
    loginErrorElement.style.display = 'none';
    loginErrorElement.textContent = '';

    const loginData = await fetchLogin(email, password);
    console.log('Login successful:', loginData);

    // Store the token in sessionStorage
    sessionStorage.setItem('token', loginData.token);

    console.log('Rand Testing email after login', email)
    console.log('Rand Testing password after login', password)
    
    window.location.href = 'index.html'; // Redirect after successful login

  } catch (error) {
    loginErrorElement.textContent = error.message;
    loginErrorElement.style.display = 'block';
  }
});
