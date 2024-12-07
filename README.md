# Henna Ventures

Welcome to **Henna Ventures**, – your ultimate online destination for seamless wedding planning and Mehendi artistry. This project integrates e-commerce functionality with a 3D model customization tool to provide a personalized henna designing experience.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

---

## About the Project

Henna Ventures is a web-based platform that bridges traditional Mehendi artistry with modern technology. It allows customers to:
- Purchase henna products and services.
- Customize Mehendi designs on a 3D hand model using drag-and-drop functionality.
- Book appointments with Mehendi artists.
- Opt for pre-defined Mehendi packages for various occasions.

This project aims to empower Mehendi artists and streamline the planning process for events requiring henna application.

---

## Features

- **3D Model Customization**:  
  Visualize how Mehendi designs appear on a 3D hand model from both front and back perspectives. Users can:
  - Rotate the hand model for a 360° view.
  - Divide the hand into 6 parts (palm and fingers) for precise customization.
  - Apply skin tones and save designs in real-time.

- **E-commerce Functionality**:  
  Browse and purchase henna products, customize gift boxes, and select Mehendi packages.

- **Appointment Scheduling**:  
  Book the nearest Mehendi artist for your occasion with an integrated artist assignment feature.

- **Admin Dashboard**:  
  Manage users, orders, products, and artist appointments.

- **Responsive Design**:  
  Seamless experience across all devices.

---

## Technologies Used

- **Frontend**:  
  - React.js  
  - Tailwind CSS  
  - Three.js (for 3D hand model rendering)

- **Backend**:  
  - Node.js  
  - Express.js  

- **Database**:  
  - MongoDB  

- **Other Tools**:  
  - Blender (for hand model creation)  
  - RESTful APIs  

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB running locally or a cloud database URL.
- Blender (if you need to modify the 3D model).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/frfarhath/henna_ventures.git
   cd henna_ventures
   ```

2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Configure the environment variables:
   Create a `.env` file in the `backend` directory and add:
   ```
   MONGO_URI=<Your MongoDB connection string>
   PORT=5000
   ```

4. Start the development servers:
   - For backend:
     ```bash
     cd backend
     npm run dev
     ```
   - For frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Access the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

1. Sign up or log in as a customer or admin.
2. Explore henna products and customize Mehendi designs.
3. Book appointments and purchase products or packages.
4. Admins can manage platform activities through the dashboard.

---
