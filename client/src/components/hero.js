import React from 'react';
import { FaCode, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa';
import './hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container text-center">
                <h1 className="hero-title">Empowering Future Coders</h1>
                <p className="hero-subtitle">
                    Master programming languages and essential skills with I Tech.
                </p>

                <div className="hero-icons">
                    <div className="icon-box">
                        <FaCode size={50} />
                    </div>
                    <div className="icon-box">
                        <FaLaptop size={50} />
                    </div>
                    <div className="icon-box">
                        <FaChalkboardTeacher size={50} />
                    </div>
                </div>

                <div className="hero-buttons">
                    <a href="/courses" className="btn btn-primary">Explore Courses</a>
                    <a href="/signup" className="btn btn-outline-light">Get Started</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
