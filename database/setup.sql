-- Imagine PPTP Prints Database Setup
-- Run this in phpMyAdmin or MySQL command line

-- Create Database
CREATE DATABASE IF NOT EXISTS imaginepptp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE imaginepptp_db;

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100),
    quantity INT,
    message TEXT,
    preferred_contact VARCHAR(50),
    spanish_preference BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'contacted', 'quoted', 'completed') DEFAULT 'new',
    notes TEXT,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quote Requests Table
CREATE TABLE IF NOT EXISTS quote_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service_type VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    design_colors INT,
    deadline DATE,
    budget_range VARCHAR(50),
    message TEXT,
    status ENUM('pending', 'quoted', 'approved', 'declined') DEFAULT 'pending',
    quoted_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_service_type (service_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    source VARCHAR(100) DEFAULT 'website',
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review TEXT NOT NULL,
    service_used VARCHAR(100),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rating (rating),
    INDEX idx_featured (featured),
    INDEX idx_approved (approved)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Testimonials
INSERT INTO testimonials (customer_name, company, rating, review, service_used, featured, approved) VALUES
('Sarah Johnson', 'TechCorp', 5, 'Amazing quality! Our team shirts look professional and the turnaround time was incredible. Highly recommend!', 'Custom Shirts', TRUE, TRUE),
('Mike Rodriguez', 'Sports League', 5, 'The custom hoodies for our event were perfect. Great communication throughout the process and excellent results.', 'Custom Hoodies', TRUE, TRUE),
('Lisa Chen', 'StartupXYZ', 5, 'Professional service from start to finish. Our company hats look great and the embroidery quality is outstanding.', 'Custom Hats', TRUE, TRUE);

-- Create Admin User Table (optional, for future admin panel)
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Grant Permissions (update with your MySQL username)
-- GRANT ALL PRIVILEGES ON imaginepptp_db.* TO 'imaginepptp_user'@'localhost' IDENTIFIED BY 'secure_password_here';
-- FLUSH PRIVILEGES;


