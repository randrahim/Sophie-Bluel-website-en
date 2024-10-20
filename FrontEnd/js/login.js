// Fetch login info from the API
async function fetchLogin(email, password) {
  try {
    const url = "http://localhost:5678/api/users/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid login credentials");
    }

    const data = await response.json();

    // Store the token in sessionStorage
    sessionStorage.setItem("token", data.token); // Assuming the token is in `data.token`

    return data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
}

// Handle the form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginErrorElement = document.getElementById("loginError");

    try {
      loginErrorElement.style.display = "none";
      loginErrorElement.textContent = "";

      // Call fetchLogin with user-provided email and password
      const loginData = await fetchLogin(email, password);
      console.log("Login successful:", loginData);

      // Store the token in sessionStorage
      sessionStorage.setItem("token", loginData.token);
      // Redirect after successful login
      window.location.href = "index.html";
    } catch (error) {
      loginErrorElement.textContent = error.message;
      loginErrorElement.style.display = "block";
    }
  });
