<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>I Tech</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* General styles */
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
        }
        header, footer {
            background-color: #1E90FF;
            color: #fff;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header nav a, footer a {
            color: #fff;
            margin: 0 10px;
            text-decoration: none;
        }
        footer {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        button {
            background-color: #FF9505;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .hero {
            text-align: center;
            background: url('hero.jpg') no-repeat center/cover;
            padding: 100px 20px;
            color: #fff;
        }
        .featured-courses, .testimonials, .catalog-page, .course-detail, .cart-page {
            padding: 20px;
        }
        .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .course {
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            text-align: center;
        }
        .course img {
            width: 100%;
            height: 150px;
        }
        .filters {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .filters input, .filters select {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    </style>
</head>
<body>

<header>
    <div class="logo">I Tech</div>
    <nav>
        <a href="#">Home</a>
        <a href="#">Courses</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
    </nav>
    <div class="icons">
        <i class="fas fa-shopping-cart"></i>
        <i class="fas fa-user"></i>
    </div>
</header>

<section class="hero">
    <h1>Learn Programming and Computer Skills Today</h1>
    <button id="explore-courses">Explore Courses</button>
</section>

<section class="featured-courses">
    <h2>Featured Courses</h2>
    <div class="course-grid" id="course-grid"></div>
</section>

<footer>
    <p>Contact us: info@itech.com | Follow us: 
        <a href="#">Facebook</a> 
        <a href="#">Twitter</a>
    </p>
    <p><a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a></p>
</footer>

<script>
    // Sample courses data
    const courses = [
        { title: "Python for Beginners", img: "python.jpg", instructor: "John Doe", price: "$50", rating: "4.5" },
        { title: "Web Development Bootcamp", img: "webdev.jpg", instructor: "Jane Smith", price: "$75", rating: "4.8" },
        { title: "Data Science 101", img: "datasci.jpg", instructor: "Chris Lee", price: "$100", rating: "4.7" },
        { title: "Cybersecurity Basics", img: "cybersec.jpg", instructor: "Anna Kim", price: "$80", rating: "4.9" }
    ];

    // Load courses dynamically
    const courseGrid = document.getElementById("course-grid");
    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");
        courseDiv.innerHTML = `
            <img src="${course.img}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>Instructor: ${course.instructor}</p>
            <p>Price: ${course.price}</p>
            <p>Rating: ${course.rating}</p>
            <button>View Details</button>
        `;
        courseGrid.appendChild(courseDiv);
    });

    // Button interaction
    document.getElementById("explore-courses").addEventListener("click", () => {
        alert("Explore our wide range of courses!");
    });
</script>

</body>
</html>
