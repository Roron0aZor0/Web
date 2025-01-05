<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dropdown in JavaScript</title>
  <style>
    /* Basic styles for the dropdown */
    body {
      font-family: Arial, sans-serif;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-button {
      background-color: #1E90FF;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      z-index: 1;
      min-width: 160px;
    }

    .dropdown-menu a {
      color: black;
      padding: 10px 15px;
      text-decoration: none;
      display: block;
    }

    .dropdown-menu a:hover {
      background-color: #f1f1f1;
    }
  </style>
</head>
<body>
  <h1>JavaScript Dropdown Menu</h1>
  <div class="dropdown">
    <button class="dropdown-button">Menu</button>
    <div class="dropdown-menu">
      <a href="#home">Home</a>
      <a href="#courses">Courses</a>
      <a href="#about">About Us</a>
      <a href="#contact">Contact</a>
    </div>
  </div>

  <script>
    // Select the button and menu
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Function to toggle the dropdown
    dropdownButton.addEventListener('click', () => {
      // Toggle the menu display
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the dropdown if clicked outside
    window.addEventListener('click', (event) => {
      if (!event.target.matches('.dropdown-button')) {
        dropdownMenu.style.display = 'none';
      }
    });
  </script>
</body>
</html>
