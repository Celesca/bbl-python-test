# Python Developer Assessment (1-1.30 hrs) - BBL

Sawit Koseeyaumporn 

<img src="https://www.share2trade.com/storage/Web%20Board/2025/180425/Untitled-1.jpg"/>


## Installation Guide

for the backend we need to create .venv first by using

```
cd backend
python -m venv .venv

On CMD
.venv\Scripts\activate

On Windows PowerShell
.venv\Scripts\Activate.ps1

On macOS/Linux
source .venv/bin/activate
```

Then install the dependencies with `pip install -r requirements.txt`

Then start server with `python server.py`

For the frontend :

```
cd frontend
npm install
npm run dev
```



Objective:

Create a simple web application or backend (REST APIs) that allows users to log in and perform

appointment bookings. The application should have a frontend for login and booking, and a backend for

authentication, authorization, and booking management.

Requirements:

1. Frontend (Optional):

o Create a login page where users can enter their username and password.

o Create a appointment booking page where users can book a time slot (as a string/text for simplicity e.g. 10am-11am).

o Use any frontend framework or library (e.g., HTML/CSS, JavaScript, React, etc.).

2. Backend:

o Implement user authentication (login) and authorization.

o Only users with admin rights can view all appointments.

o Users without admin rights can only manage their own bookings.

o Use Python and any web framework (e.g., Flask, Django, FastAPI, etc.).

 

Instructions:

1. Setup:

o Create a new project directory and initialize a virtual environment.

o Install necessary dependencies for the chosen frontend and backend frameworks.

 

2. Frontend Implementation:

o Create a login.html page with fields for username and password.

o Create a booking.html page with a simple interface for booking time slots.

o Ensure the frontend communicates with the backend API for login and booking actions.

 

3. Backend Implementation:

o Create a user model with fields for username, password, and admin status.

o Implement endpoints for user login and booking management.

o Ensure proper authentication and authorization for each endpoint.

o Use an in-memory data store (e.g., Python dictionary) for simplicity or any other data

stores.

 

4. Testing:

o Test the login functionality with different user credentials.

o Test the booking functionality for both admin and non-admin users.

o Ensure that admin users can view all bookings, while non-admin users can only manage their own bookings.

