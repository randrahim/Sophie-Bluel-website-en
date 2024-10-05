// Event listener for submitting the Add Photo form
document.getElementById('addPhotoForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const token = sessionStorage.getItem('Token'); 
  if (!token) {
      alert('You are not logged in.');
      return;
  }

  const title = document.getElementById('title').value;
  const categoryId = document.getElementById('category').value;
  const fileInput = document.getElementById('photo').files[0];

  if (!fileInput) {
      alert('Please select a photo.');
      return;
  }

  const formData = new FormData();
  formData.append('image', fileInput);
  formData.append('title', title);
  formData.append('category', categoryId);

  try {
      const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
      });

      if (response.ok) {
          alert('Work uploaded successfully!');
      } else if (response.status === 401) {
          alert('Unauthorized. Please login again.');
      } else {
          alert('Failed to upload work.');
      }
  } catch (error) {
      console.error('Error uploading work:', error);
      alert('An error occurred while uploading the work.');
  }
});
