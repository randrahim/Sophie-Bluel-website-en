document.getElementById('editButton').addEventListener('click', async () => {
  const jobs = await fetchJobs();
  if (jobs) {
      // Call displayJobsInGallery(jobs) function from below
      displayJobsInGallery(jobs);
  }
  // Call openModel() function to open the popup window
  openModal();      
});

// Fetch works (galleries) from API
async function fetchJobs() {
  try {
      const response = await fetch('http://localhost:5678/api/works'); // Use Swagger API URL
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

function displayJobsInGallery(jobs) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';      // Clear any existing content

  jobs.forEach(job => {
      const jobElement = document.createElement('div'); // Create a div to contain the images
      jobElement.className = 'job-item';                // class name for each div

      const img = document.createElement('img');
      img.src = job.imageUrl;  // Assuming the job object has an imageUrl property
      img.alt = job.title;     // Assuming the job object has a title property

      const title = document.createElement('p'); // Create a <p> for the title
      title.textContent = job.title;

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button'; // Class name for styling
      deleteButton.innerHTML = '&#x1f5d1;'; // 'trash can' character in html entity

      jobElement.appendChild(img);
      jobElement.appendChild(deleteButton); // Append the delete button on top of the image
      jobElement.appendChild(title);

      gallery.appendChild(jobElement);
  });
}

// Function to add event listeners for filtering
function addFilterEventListeners(jobs) {
  const filterButtons = document.querySelectorAll('.filter-option');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const categoryId = button.getAttribute('data-category-id');
      filterGalleryByCategoryId(jobs, categoryId);  // Filter the gallery based on selected category
    });
  });
}

// Function to filter gallery by categoryId
function filterGalleryByCategoryId(jobs, categoryId) {
  const gallery = document.getElementById('gallery');
  
  if (categoryId === 'all') {
    displayJobsInGallery(jobs);  // Show all jobs if 'All' is selected
  } else {
    const filteredJobs = jobs.filter(job => job.categoryId == categoryId);
    displayJobsInGallery(filteredJobs);  // Display only the jobs that match the selected category
  }
}

function openModal() {
  // Call the div with popup id 
  const modal = document.getElementById('popup');
  modal.style.display = 'block';

  // Close the modal when the close button is clicked
  document.querySelector('.close-button').onclick = function() {
      modal.style.display = 'none';
  };

  // Close the modal when clicking outside of the modal content
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  };
}
