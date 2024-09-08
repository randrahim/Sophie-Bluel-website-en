// Fetch login from API
async function fetchLogin() {
  try {
      const response = await fetch('http://localhost:5678/api/users/login'); // Use Swagger API URL
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      //return the jobs when the response is true
      const jobs = await response.json();       
      return jobs;
  } catch (error) {
      console.error('Failed to fetch jobs:', error);
  }
}