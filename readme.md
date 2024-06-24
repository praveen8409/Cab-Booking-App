Ride Hailing System
=====================

Overview
--------

This is a ride hailing system that allows customers to request cabs and drivers to accept or decline requests. The system uses Node.js, Express, and Socket.IO for real-time communication.

Components
------------

### Server

* `app.js`: The main application file that sets up the Express server and Socket.IO.
* `models/`: Directory containing Mongoose models for customers, drivers, and requests.
* `controllers/`: Directory containing controllers for customer and driver functionality.
* `routes/`: Directory containing routes for customer and driver requests.
* `sockets/`: Directory containing Socket.IO event handlers for customer and driver sockets.

### Client

* `customer.html`: The customer-facing HTML page that allows customers to request cabs.
* `driver.html`: The driver-facing HTML page that allows drivers to accept or decline requests.
* `customer.js`: The JavaScript file that handles customer requests and updates the customer page.
* `driver.js`: The JavaScript file that handles driver requests and updates the driver page.

### Models

#### Customer Model

* `customerModel.js`: Defines the customer schema with an `id` and `location` field.

#### Driver Model

* `driverModel.js`: Defines the driver schema with an `id`, `location`, and `status` field.

#### Request Model

* `requestModel.js`: Defines the request schema with a `customer` field, `driver` field, `location` field, and `status` field.

### Controllers

#### Customer Controller

* `customerController.js`: Handles customer requests and updates the customer page.

#### Driver Controller

* `driverController.js`: Handles driver requests and updates the driver page.

### Routes

#### Customer Routes

* `customerRoutes.js`: Defines routes for customer requests.

#### Driver Routes

* `driverRoutes.js`: Defines routes for driver requests.

### Sockets

#### Customer Socket

* `customerSocket.js`: Handles customer socket events and updates the customer page.

#### Driver Socket

* `driverSocket.js`: Handles driver socket events and updates the driver page.

Setup
-----

### Install Dependencies

Run `npm install` to install the required dependencies.

### Start the Server

Run `node app.js` to start the server.

### Open the Client Pages

Open `customer.html` and `driver.html` in separate browser windows to test the system.

Functionality
-------------

### Customer Functionality

* Customers can request cabs by submitting a form with their ID and location.
* Customers can view the status of their request in real-time.

### Driver Functionality

* Drivers can register themselves by submitting a form with their ID and location.
* Drivers can view new requests in real-time and accept or decline them.
* Drivers can view the status of their accepted requests in real-time.

Note: This is a basic implementation of a ride hailing system and may require additional features and functionality to be production-ready.