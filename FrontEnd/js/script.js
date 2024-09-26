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

      const title = document.createElement('p');
      title.textContent = job.title;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.innerHTML = '&#x1f5d1;'; // Trash can icon

      jobElement.appendChild(img);
      jobElement.appendChild(deleteButton);
      jobElement.appendChild(title);
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

// Event listener for submitting the Add Photo form
document.getElementById('addPhotoForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const token = sessionStorage.getItem('token');
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
          openThirdModal(); // Open success modal upon successful upload
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

// Open the third modal (Confirmation or Success Modal)
function openThirdModal() {
  openModal('thirdModal');
}

// Fetch categories from the API
async function fetchCategories() {
  try {
      const response = await fetch('http://localhost:5678/api/categories');
      if (!response.ok) {
          throw new Error('Failed to fetch categories.');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
  }
}



// document.getElementById('editButton').addEventListener('click', async () => {
//   const jobs = await fetchJobs();
//   if (jobs) {
//       // Call displayJobsInGallery(jobs) function from below
//       displayJobsInGallery(jobs);
//   }
//   // Call openModel() function to open the popup window
//   openModal();      
// });

// // Fetch works (galleries) from API
// async function fetchJobs() {
//   try {
//       const response = await fetch('http://localhost:5678/api/works'); // Use Swagger API URL
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       //return the jobs when the response is true
//       const jobs = await response.json();       
//       return jobs;
//   } catch (error) {
//       console.error('Failed to fetch jobs:', error);
//   }
// }

// function displayJobsInGallery(jobs) {
//   const gallery = document.getElementById('gallery');
//   gallery.innerHTML = '';      // Clear any existing content

//   jobs.forEach(job => {
//       const jobElement = document.createElement('div'); // Create a div to contain the images
//       jobElement.className = 'job-item';                // class name for each div

//       const img = document.createElement('img');
//       img.src = job.imageUrl;  // Assuming the job object has an imageUrl property
//       img.alt = job.title;     // Assuming the job object has a title property

//       const title = document.createElement('p'); // Create a <p> for the title
//       title.textContent = job.title;

//       // Create delete button
//       const deleteButton = document.createElement('button');
//       deleteButton.className = 'delete-button'; // Class name for styling
//       deleteButton.innerHTML = '&#x1f5d1;'; // 'trash can' character in html entity

//       jobElement.appendChild(img);
//       jobElement.appendChild(deleteButton); // Append the delete button on top of the image
//       jobElement.appendChild(title);

//       gallery.appendChild(jobElement);
//   });
// }

// // Function to add event listeners for filtering
// function addFilterEventListeners(jobs) {
//   const filterButtons = document.querySelectorAll('.filter-option');

//   filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       const categoryId = button.getAttribute('data-category-id');
//       filterGalleryByCategoryId(jobs, categoryId);  // Filter the gallery based on selected category
//     });
//   });
// }

// // Function to filter gallery by categoryId
// function filterGalleryByCategoryId(jobs, categoryId) {
//   const gallery = document.getElementById('gallery');
  
//   if (categoryId === 'all') {
//     displayJobsInGallery(jobs);  // Show all jobs if 'All' is selected
//   } else {
//     const filteredJobs = jobs.filter(job => job.categoryId == categoryId);
//     displayJobsInGallery(filteredJobs);  // Display only the jobs that match the selected category
//   }
// }

// function openModal() {
//   // Call the div with popup id 
//   const modal = document.getElementById('popup');
//   modal.style.display = 'block';

//   // Close the modal when the close button is clicked
//   document.querySelector('.close-button').onclick = function() {
//       modal.style.display = 'none';
//   };

//   // Close the modal when clicking outside of the modal content
//   window.onclick = function(event) {
//       if (event.target == modal) {
//           modal.style.display = 'none';
//       }
//   };
// }
