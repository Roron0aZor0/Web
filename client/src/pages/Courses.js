import React from 'react';
import '../styles/Courses.css';
import FAQ from './FAQ';
import CTA from '../components/CTA';

function Courses() {
  return (
    <div className="courses-page">
      {/* Hero Section for Courses */}
      <section className="hero-section">
        {/* Heading for the Courses Page */}
        <h2>Our Courses</h2>
        <p>
          Explore our diverse range of courses designed to help you achieve your
          academic and professional goals.
        </p>
      </section>

      {/* Courses List Section */}
      <section className="courses-list">
        {/* Example of Static Course Items */}
        <ul>
          <li>Course 1 - Description</li>
          <li>Course 2 - Description</li>
          <li>Course 3 - Description</li>
        </ul>
      </section>

      {/* Dynamic Courses Section */}
      {/* TODO: Fetch courses dynamically from the backend */}
      {/* Suggestion: Use a useEffect hook to fetch courses and display them */}
      {/* Example Placeholder:
        const [courses, setCourses] = useState([]);
        useEffect(() => {
          fetch('/api/courses')
            .then((res) => res.json())
            .then((data) => setCourses(data));
        }, []);
      */}

      {/* Search and Filter */}
      {/* TODO: Add search and filtering functionality for courses */}
      {/* Suggestion: Create a search bar and filter dropdowns */}
      <section className="courses-search-filter">
        <input
          type="text"
          placeholder="Search for a course..."
          className="search-bar"
        />
        <select className="filter-dropdown">
          <option value="all">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
        </select>
      </section>

      {/* Featured Courses */}
      {/* TODO: Highlight featured or popular courses */}
      {/* Suggestion: Display featured courses using cards with images and details */}
      <section className="featured-courses">
        <h3>Featured Courses</h3>
        {/* Example Card Layout */}
        <div className="course-card">
          <h4>Course Title</h4>
          <p>Brief description of the course.</p>
          <button className="enroll-button">Enroll Now</button>
        </div>
      </section>

    

      {/* FAQ Component */}
      {/* Reusing the FAQ component to answer common course-related questions */}
      <FAQ />
      
      {/* Call to Action */}
      {/* Encourage users to enroll in courses with a call to action */}
        <CTA />
    </div>
  );
}

export default Courses;
