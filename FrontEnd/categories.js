document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-option');

  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Retrieve the category ID from the button
      const categoryId = button.getAttribute('data-category-id');
      filterGalleryByCategoryId(categoryId);
    });
  });
});

function filterGalleryByCategoryId(categoryId) {
  const figures = document.querySelectorAll('.gallery figure');

  figures.forEach(figure => {
    // Assuming each figure has a data attribute with categoryId (e.g., data-category-id="1")
    const figureCategoryId = figure.getAttribute('data-category-id');

    // Show all figures if "All" is clicked
    if (categoryId === 'all') {
      figure.style.display = '';  // Show all figures
    } else if (figureCategoryId === categoryId) {
      figure.style.display = '';  // Show figure
    } else {
      figure.style.display = 'none';  // Hide figure
    }
  });
}
