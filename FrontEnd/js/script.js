// Event listener for the 'Edit' button to open the first modal and fetch works
document.getElementById('editButton').addEventListener('click', async () => {
  const works = await fetchWorks();
  if (works) {
      displayWorksInGallery(works);
      addFilterEventListeners(works);
  }
  openModal('popup'); // Open the first popup window
});

// Function to display works in the gallery
function displayWorksInGallery(works) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing content

  works.forEach(work => {
      const workElement = document.createElement('div');
      workElement.className = 'work-item';

      const img = document.createElement('img');
      img.src = work.imageUrl; // Assuming work has an imageUrl property
      img.alt = work.title; // Assuming work has a title property

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.innerHTML = '&#x1f5d1;'; // Trash can icon

    
      // Add event listener to delete button
      deleteButton.addEventListener('click', async () => {
        await deleteWork(work.id); // Delete the work by its ID
        // Remove the work element from the DOM
        workElement.remove();
      });

      workElement.appendChild(img);
      workElement.appendChild(deleteButton);
      gallery.appendChild(workElement);
  });
}

// Add event listeners for filtering
function addFilterEventListeners(works) {
  document.querySelectorAll('.filter-option').forEach(button => {
      button.addEventListener('click', () => {
          const categoryId = button.getAttribute('data-category-id');
          filterGalleryByCategoryId(works, categoryId);
      });
  });
}

// Function to filter gallery by categoryId
function filterGalleryByCategoryId(works, categoryId) {
  const filteredWorks = categoryId === 'all' ? works : works.filter(work => work.categoryId == categoryId);
  displayWorksInGallery(filteredWorks);
}

// Function to open modals (popup windows)
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';

  document.querySelectorAll('.close-button').forEach(button => {
      button.onclick = () => modal.style.display = 'none';
  });

  window.onclick = event => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  };
}

// Event listener to open the second modal (Add Photo)
document.getElementById('add-a-photo-btn').addEventListener('click', async () => {
  document.getElementById('popup').style.display = 'none'; // Hide the first modal
  await openSecondModal(); // Open the second modal
});

// Open the second modal (Add Photo) and fetch categories
async function openSecondModal() {
  openModal('addPhotoModal'); // Open the second modal

  try {
      const categories = await fetchCategories();
      const categorySelect = document.getElementById('category');
      categorySelect.innerHTML = ''; // Clear existing options

      categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
      });
  } catch (error) {
      console.error('Failed to load categories:', error);
      alert('Could not load categories. Please try again later.');
  }

  // Handle back button event to return to the first modal
  document.querySelector('.back-button').onclick = () => {
      document.getElementById('addPhotoModal').style.display = 'none';
      document.getElementById('popup').style.display = 'block'; // Show the first modal again
  };
}

 // Add the code for the close button on the top-right corner of the second modal
  document.querySelector('#addPhotoModal .close-button').addEventListener('click', () => {
  document.getElementById('addPhotoModal').style.display = 'none'; // Hide the second modal
});


// To preview the image when gets uploaded
function showPreview(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('photoPreview').src = e.target.result;

          // Hide the text elements when an image is selected
          document.querySelector('.add-photo-label button').style.display = 'none';
          document.querySelector('.add-photo-label span').style.display = 'none';
      };
      reader.readAsDataURL(file);
  }
}

