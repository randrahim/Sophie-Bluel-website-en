// Function to open the first modal (Photo Gallery)
function openFirstModal() {
  const modal = document.getElementById('popup');
  modal.style.display = 'block';

  // Close the modal when the close button is clicked
  document.querySelector('.close-button').onclick = function() {
      modal.style.display = 'none';
  };
}

// Function to open the second modal (Add Photo)
function openSecondModal() {
  const firstModal = document.getElementById('popup');
  const secondModal = document.getElementById('addPhotoModal');

  // Hide the first modal and show the second one
  firstModal.style.display = 'none';
  secondModal.style.display = 'block';

  // Handle back button to go back to the first modal
  document.querySelector('.back-button').onclick = function() {
    secondModal.style.display = 'none';
    firstModal.style.display = 'block';
  };

  // Close the second modal when clicking the close button
  document.querySelector('.close-button').onclick = function() {
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
  document.querySelectorAll('.close-button').forEach(button => {
    button.onclick = function() {
      thirdModal.style.display = 'none';
    };
  });
}

// Event listener to open the first modal (Photo Gallery)
document.getElementById('editButton').addEventListener('click', async () => {
  const jobs = await fetchJobs();
  if (jobs) {
      displayJobsInGallery(jobs);
  }
  openFirstModal();      
});

// Event listener to open the second modal (Add Photo)
document.getElementById('add-a-photo-btn').addEventListener('click', () => {
  openSecondModal();
});

// Event listener for submitting the Add Photo form and opening the third modal
document.getElementById('addPhotoForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Simulate the form submission and upload process
  const formData = new FormData();
  formData.append('image', document.getElementById('photo').files[0]);
  formData.append('title', document.getElementById('title').value);
  formData.append('category', document.getElementById('category').value);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Open the third modal on successful upload
      openThirdModal();
    } else {
      alert('Failed to upload photo.');
    }
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
});
