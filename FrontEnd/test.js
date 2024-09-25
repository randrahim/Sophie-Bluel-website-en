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
document.getElementById('addPhotoForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('image', document.getElementById('photo').files[0]);
  formData.append('title', document.getElementById('title').value);
  formData.append('category', document.getElementById('category').value);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
    });
    console.log(await response.json());
    console.log('Rand Testing body', formData);
    console.log('Rand Testing body', response);
    if (response.ok) {
      // Open the third modal on successful upload
      openThirdModal();
      console.log('Rand Testing when response is ok');
    } else {
      alert('Failed to upload photo. Please check your input and try again.');
      console.log('Rand Testing error after alert');
    }
  } catch (error) {
    console.error('Error uploading photo:', error);
    alert('An error occurred while uploading the photo. Please try again.');
  }
});

// Event listener to open the second modal (Add Photo)
document.getElementById('add-a-photo-btn').addEventListener('click', () => {
 openSecondModal();
});

// Fetch categories from the API
async function fetchCategories() {
  try {
    const url = 'http://localhost:5678/api/categories'; // Adjust this URL to your API endpoint
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
