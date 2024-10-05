// Function to delete a work
async function deleteWork(workId) {
  
  const token = sessionStorage.getItem('Token'); // Get the token for authentication
  if (!token) {
    alert('You are not logged in.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Work deleted successfully!');
    } else if (response.status === 401) {
      alert('Unauthorized. Please login again.');
    } else {
      alert('Failed to delete work.');
    }
  } catch (error) {
    console.error('Error deleting work:', error);
    alert('An error occurred while deleting the work.');
  }
}