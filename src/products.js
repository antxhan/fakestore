// Implement the "like" button functionality
document.querySelectorAll('.like-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Toggle the "liked" class to change the style
    button.classList.toggle('liked');
    // button.textContent = button.classList.contains('liked') ? '♥' : '♡';
  });
});