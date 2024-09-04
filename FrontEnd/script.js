document.getElementById('editButton').addEventListener('click', async () => {
  const jobs = await fetchJobs();
  if (jobs) {
      displayJobsInGallery(jobs);
  }
  openModal();
});

async function fetchJobs() {
  try {
      const response = await fetch('http://localhost:5678/api/works'); // Replace with your actual API endpoint
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const jobs = await response.json();
      return jobs;
  } catch (error) {
      console.error('Failed to fetch jobs:', error);
  }
}

function displayJobsInGallery(jobs) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear any existing content

  jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.className = 'job-item';

      const img = document.createElement('img');
      img.src = job.imageUrl; // Assuming the job object has an imageUrl property
      img.alt = job.title;     // Assuming the job object has a title property

      const title = document.createElement('p');
      title.textContent = job.title;

      jobElement.appendChild(img);
      jobElement.appendChild(title);
      gallery.appendChild(jobElement);
  });
}

function openModal() {
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
