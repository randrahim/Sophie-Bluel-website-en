// Function to open the second modal (Add Photo)
async function openSecondModal() {
  const secondModal = document.getElementById('addPhotoModal');

  // Show the second modal
  secondModal.style.display = 'block';

  // Fetch and populate categories
  try {
    const categories = await fetchCategories();
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = ''; // Clear existing options

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.id; // Assuming category has an 'id' property
      option.textContent = category.name; // Assuming category has a 'name' property
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to load categories:', error);
    alert('Could not load categories. Please try again later.');
  }

  // Handle back button to hide the second modal
  document.querySelector('.back-button').onclick = function () {
    secondModal.style.display = 'none';
  };
}

// Function to open the third modal (Confirmation or Success Modal)
function openThirdModal() {
  const secondModal = document.getElementById('addPhotoModal');
  const thirdModal = document.getElementById('thirdModal');

  // Hide the second modal and show the third modal
  secondModal.style.display = 'none';
  thirdModal.style.display = 'block';

  // Close the third modal when clicking the close button
  document.querySelectorAll('.close-button').forEach((button) => {
    button.onclick = function () {
      thirdModal.style.display = 'none';
    };
  });
}

// Event listener for submitting the Add Photo form and opening the third modal
document.getElementById('addPhotoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form input values
  const title = document.getElementById('title').value;
  const categoryId = document.getElementById('category').value;
  const fileInput = document.getElementById('photo').files[0];

  if (!fileInput) {
    alert('Please select a photo.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('image', fileInput);      // Append the image file
    formData.append('title', title);          // Append the title
    formData.append('category', categoryId);  // Append the category ID

    // Replace YOUR_AUTH_TOKEN with the actual token you're using
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';
    // const token = sessionStorage.getItem('token');
    // const token = sessionStorage.getItem('token');

    const response = fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      // body: formData,
      body: JSON.stringify(formData),
    });
    console.log('Rand Testing response', response);
    console.log('Rand Testing response', headers);

    if (response.ok) {
      // Step 2: Open the third modal on successful upload
      openThirdModal();
      console.log('Upload successful!');
    } else {
      const errorData = response.json();
      console.error('Error:', errorData);
      alert('Failed to upload photo.');
    }
  } catch (error) {
    alert('An error occurred while uploading the photo.');
  }
});


// Event listener to open the second modal (Add Photo)
document.getElementById('add-a-photo-btn').addEventListener('click', () => {
 openSecondModal();
});

// Fetch categories from the API
async function fetchCategories() {
  try {
    const url = 'http://localhost:5678/api/categories';
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
