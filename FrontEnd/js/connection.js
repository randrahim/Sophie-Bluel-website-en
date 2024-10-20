// Base URL for the Swagger API
const API_BASE_URL = "http://localhost:5678/api";

// Function for logging in
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    sessionStorage.setItem("isConnected", "true"); // Store that the user is logged in
    sessionStorage.setItem("Token", data.token); // Store the token value
    window.location.href = "index.html"; // Redirect to the home page after successful login

    return data;
  } catch (error) {
    console.error("Error with fetch operation:", error);
    const loginError = document.getElementById("loginError");
    if (loginError) {
      loginError.style.display = "block"; // Show error message
    }
  }
}

// Function to update UI based on login state
function updateUIOnLoginState() {
  const loginLink = document.querySelector(".login");
  const logoutLink = document.querySelector(".logout");
  const filterOptions = document.querySelector(".filter-options");
  const editLink = document.querySelector(".edit-header");
  const isConnected = sessionStorage.getItem("isConnected");

  if (isConnected === "true") {
    if (loginLink) loginLink.style.display = "none"; // Hide the login link when logged in
    if (logoutLink) logoutLink.style.display = "block"; // Show the logout link
    if (filterOptions) filterOptions.style.display = "none"; // Hide the filter options
    if (editLink) editLink.style.display = "inline-block"; // Show edit link if needed
  } else {
    if (loginLink) loginLink.style.display = "block"; // Show the login link when not logged in
    if (logoutLink) logoutLink.style.display = "none"; // Hide the logout link
    if (filterOptions) filterOptions.style.display = "block"; // Show the filter options
    if (editLink) editLink.style.display = "none"; // Hide edit link if not logged in
  }
}

// Event listener for logout
function setupLogoutListener() {
  const logoutLink = document.querySelector(".logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      sessionStorage.removeItem("isConnected"); // Remove the login state
      updateUIOnLoginState(); // Update UI after logout
      window.location.replace("index.html"); // Redirect to the homepage
    });
  }
}

// Event listener for login form submission on login.html
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission

      // Get email and password from the form
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Attempt to log in
      loginUser(email, password);
    });
  }

  // Initialize UI on page load based on login state
  updateUIOnLoginState();
  setupLogoutListener(); // Set up the logout listener
});
