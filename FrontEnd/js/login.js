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
      console.log('Rand Testing errorData', errorData)
      throw new Error(errorData.message || 'Invalid login credentials');
    }

    console.log('Rand Testing response', response)

    const data = await response.json();
    console.log('Rand Testing Login data', data)

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

  console.log('Rand Testing email before', email)
  console.log('Rand Testing password before', password)

  try {
    loginErrorElement.style.display = 'none';
    loginErrorElement.textContent = '';

    const loginData = await fetchLogin(email, password);
    console.log('Login successful:', loginData);

    console.log('Rand Testing email after', email)
    console.log('Rand Testing password after', password)

    // After successful login, show edit section and hide filter options
    // document.querySelector('.edit-header').style.display = 'block';  // Show Edit Section
    // document.querySelector('.filter-options').style.display = 'none'; // Hide Filter Section

    // Optionally, redirect after a short delay
    // window.location.href = 'index.html'; // Uncomment if redirect is needed

  } catch (error) {
    loginErrorElement.textContent = error.message;
    loginErrorElement.style.display = 'block';
  }
});
