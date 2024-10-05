// Function to delete a job
async function deleteJob(jobId) {
  
  const token = sessionStorage.getItem('Token'); // Get the token for authentication
  if (!token) {
    alert('You are not logged in.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5678/api/works/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Job deleted successfully!');
    } else if (response.status === 401) {
      alert('Unauthorized. Please login again.');
    } else {
      alert('Failed to delete job.');
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    alert('An error occurred while deleting the job.');
  }
}