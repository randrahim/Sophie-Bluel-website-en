// Fetch works (galleries) from API
async function fetchWorks() {
  try {
      const response = await fetch('http://localhost:5678/api/works'); // Use Swagger API URL
      if (!response.ok) {
          throw new Error('Failed to fetch works.');
      }
      return await response.json(); // Return the works as JSON
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const API_BASE_URL = 'http://localhost:5678/api'; // Base URL for the Swagger API
  const mainGalleryContainer = document.getElementById('main-gallery'); // Main gallery container
  const modalGalleryContainer = document.getElementById('gallery'); // Modal gallery container
  const addPhotoButton = document.getElementById('add-a-photo-btn'); // Add a Photo button

  // Fetch and display existing works in the main gallery and modal gallery
  fetchAndDisplayWorks();

  // Function to fetch and display works
  async function fetchAndDisplayWorks() {
      try {
          // Fetch works from the Swagger API
          const response = await fetch(`${API_BASE_URL}/works`);
          if (!response.ok) {
              throw new Error('Failed to fetch works');
          }

          const works = await response.json();

          // Display works in the main gallery (always visible) and in the modal gallery (if user is logged in)
          displayWorksInGallery(works, mainGalleryContainer);
          displayWorksInGallery(works, modalGalleryContainer);
      } catch (error) {
          console.error('Error:', error);
      }
  }

  // Function to display works in a given gallery container
  function displayWorksInGallery(works, galleryContainer) {
      galleryContainer.innerHTML = ''; // Clear existing content

      works.forEach(work => appendWorkToGallery(work, galleryContainer));
  }

  // Function to append a single work to a gallery container
  function appendWorkToGallery(work, galleryContainer) {
      const figure = document.createElement('figure');
      figure.setAttribute('data-category-id', work.categoryId);

      const img = document.createElement('img');
      img.src = work.imageUrl; // Assuming `work.imageUrl` contains the URL to the image
      img.alt = work.title; // Assuming `work.title` contains the image title

      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Add delete button only for modal gallery (typically if user is logged in)
      if (galleryContainer.id === 'modal-gallery') {
          const deleteButton = document.createElement('button');
          deleteButton.className = 'delete-button';
          deleteButton.innerHTML = '&#x1f5d1;'; // Trash can icon

          // Add event listener to delete button
          deleteButton.addEventListener('click', async () => {
              await deleteWork(work.id); // Assuming deleteWork is a function to delete a work by its ID
              // Remove the work element from the DOM
              figure.remove();
          });

          figure.appendChild(deleteButton);
      }

      galleryContainer.appendChild(figure);
  }

  // Event listener for adding a new photo (only available for logged-in users)
  if (addPhotoButton) {
      addPhotoButton.addEventListener('click', function () {
          const photoData = {
              // Gather the necessary data for the new photo (e.g., title, imageUrl, categoryId)
              title: 'New Photo Title',
              imageUrl: 'http://localhost:5678/images/new-photo.png',
              categoryId: 1 // Example category ID
          };

          addNewPhoto(photoData); // Call the function to add a new photo
      });
  }

  // Function to handle adding a new photo
  async function addNewPhoto(photoData) {
      try {
          const response = await fetch(`${API_BASE_URL}/works`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${sessionStorage.getItem('Token')}` // Assuming you need a token for authentication
              },
              body: JSON.stringify(photoData)
          });

          if (!response.ok) {
              throw new Error('Failed to add new photo');
          }

          const newWork = await response.json();

          // Add the new work to both the main gallery and modal gallery
          appendWorkToGallery(newWork, mainGalleryContainer);
          appendWorkToGallery(newWork, modalGalleryContainer);

      } catch (error) {
          console.error('Error adding new photo:', error);
      }
  }
});
