// Fetch works (galleries) from API
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Use Swagger API URL
    if (!response.ok) {
      throw new Error("Failed to fetch works.");
    }
    return await response.json(); // Return the works as JSON
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL = "http://localhost:5678/api"; // Base URL for the Swagger API
  const mainGalleryContainer = document.getElementById("main-gallery"); // Main gallery container
  const modalGalleryContainer = document.getElementById("gallery"); // Modal gallery container
  const addPhotoButton = document.getElementById("add-a-photo-btn"); // Add a Photo button
  const firstModal = document.getElementById("popup"); // Assuming you have a first modal
  const secondModal = document.getElementById("addPhotoModal"); // Assuming you have a second modal
  const submitPhotoButton = document.getElementById("submit-photo-btn"); // Submit button in the second modal

  // Fetch and display existing works in the main gallery and modal gallery
  fetchAndDisplayWorks();

  // Function to fetch and display works
  async function fetchAndDisplayWorks() {
    try {
      // Fetch works from the Swagger API
      const response = await fetch(`${API_BASE_URL}/works`);
      if (!response.ok) {
        throw new Error("Failed to fetch works");
      }

      const works = await response.json();

      // Display works in the main gallery (always visible) and in the modal gallery (if user is logged in)
      displayWorksInGallery(works, mainGalleryContainer);
      displayWorksInGallery(works, modalGalleryContainer);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Function to display works in a given gallery container
  function displayWorksInGallery(works, galleryContainer) {
    galleryContainer.innerHTML = ""; // Clear existing content
    works.forEach((work) => appendWorkToGallery(work, galleryContainer));
  }

  // Function to append a single work to a gallery container
  function appendWorkToGallery(work, galleryContainer) {
    const figure = document.createElement("figure");
    figure.setAttribute("data-category-id", work.categoryId);

    const img = document.createElement("img");
    img.src = work.imageUrl; // Assuming `work.imageUrl` contains the URL to the image
    img.alt = work.title; // Assuming `work.title` contains the image title

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Add delete button only for modal gallery (typically if user is logged in)
    if (galleryContainer.id === "modal-gallery") {
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.innerHTML = "&#x1f5d1;"; // Trash can icon

      // Add event listener to delete button
      deleteButton.addEventListener("click", async () => {
        await deleteWork(work.id); // Assuming deleteWork is a function to delete a work by its ID
        // Remove the work element from the DOM
        figure.remove();
      });

      figure.appendChild(deleteButton);
    }

    galleryContainer.appendChild(figure);
  }

  // Transition from the first modal to the second modal when "Add a Photo" is clicked
  if (addPhotoButton) {
    addPhotoButton.addEventListener("click", function () {
      // Hide the first modal
      firstModal.style.display = "none";

      // Show the second modal
      secondModal.style.display = "block";
    });
  }

  // Event listener for submitting the new photo in the second modal
  if (submitPhotoButton) {
    submitPhotoButton.addEventListener("click", function () {
      const photoInput = document.getElementById("photo");
      const titleInput = document.getElementById("photo-title");
      const categoryInput = document.getElementById("photo-category");

      if (!photoInput.files.length) {
        alert("Please select a photo.");
        return;
      }

      const photoData = {
        title: titleInput.value,
        categoryId: categoryInput.value,
        imageUrl: "", // The image URL will be set after the image is uploaded
      };

      // Call the function to add a new photo
      addNewPhoto(photoData);
    });
  }

  // Function to handle adding a new photo
  async function addNewPhoto(photoData) {
    const token = sessionStorage.getItem("Token"); // Get the token for authentication
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", photoData.title);
      formData.append("category", photoData.categoryId);

      // Append the photo file from the form
      const photoInput = document.getElementById("photo");
      if (photoInput && photoInput.files.length > 0) {
        formData.append("image", photoInput.files[0]); // Append the selected file
      } else {
        throw new Error("No photo selected");
      }

      const response = await fetch(`${API_BASE_URL}/works`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the token for authentication
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add new photo");
      }

      const newWork = await response.json();

      // Add the new work to both the main gallery and modal gallery
      appendWorkToGallery(newWork, mainGalleryContainer);
      appendWorkToGallery(newWork, modalGalleryContainer);
    } catch (error) {
      console.error("Error adding new photo:", error);
    }
  }
});
