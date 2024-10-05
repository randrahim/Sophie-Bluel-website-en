// Event listener for the 'Edit' button to open the first modal and fetch jobs
document.getElementById('editButton').addEventListener('click', async () => {
  const jobs = await fetchJobs();
  if (jobs) {
      displayJobsInGallery(jobs);
      addFilterEventListeners(jobs);
  }
  openModal('popup'); // Open the first popup window
});

// Fetch works (galleries) from API
async function fetchJobs() {
  try {
      const response = await fetch('http://localhost:5678/api/works'); // Use Swagger API URL
      if (!response.ok) {
          throw new Error('Failed to fetch jobs.');
      }
      return await response.json(); // Return the jobs as JSON
  } catch (error) {
      console.error('Error:', error);
  }
}

// Function to display jobs in the gallery
function displayJobsInGallery(jobs) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing content

  jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.className = 'job-item';

      const img = document.createElement('img');
      img.src = job.imageUrl; // Assuming job has an imageUrl property
      img.alt = job.title; // Assuming job has a title property

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.innerHTML = '&#x1f5d1;'; // Trash can icon

    
      // Add event listener to delete button
      deleteButton.addEventListener('click', async () => {
        await deleteJob(job.id); // Delete the job by its ID
        // Remove the job element from the DOM
        jobElement.remove();
      });

      jobElement.appendChild(img);
      jobElement.appendChild(deleteButton);
      gallery.appendChild(jobElement);
  });
}

// Add event listeners for filtering
function addFilterEventListeners(jobs) {
  document.querySelectorAll('.filter-option').forEach(button => {
      button.addEventListener('click', () => {
          const categoryId = button.getAttribute('data-category-id');
          filterGalleryByCategoryId(jobs, categoryId);
      });
  });
}

// Function to filter gallery by categoryId
function filterGalleryByCategoryId(jobs, categoryId) {
  const filteredJobs = categoryId === 'all' ? jobs : jobs.filter(job => job.categoryId == categoryId);
  displayJobsInGallery(filteredJobs);
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

