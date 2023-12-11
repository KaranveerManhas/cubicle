# Cubicle: Employee Review System

Cubicle is an employee review system designed to streamline the process of assigning performance reviews and providing constructive feedback to employees. This web-based application offers a user-friendly interface for administrators, and employees to manage and track performance evaluations.

## Features

### 1. User Roles

Cubicle supports multiple user roles to ensure a secure and organized review process:

- **Administrator**: Has full control over the system, including user management and access to all reviews.

- **Employee**: Can view their performance reviews, and give feedback on other's performance.

### 2. Performance Reviews

Cubicle allows administrators to create and assign performance reviews to employees. Key features include:

- **Assign Review**: Assign an employee to another employee's performance review.
- **Provide Feedback**: Administrator can provide feedback on any employee. Employees can only give feedback for employees which they are assigned.


## Getting Started

Follow these steps to set up Cubicle on your local machine:

1. **Clone the Repository**:
   ```
   git clone https://github.com/KaranveerManhas/cubicle.git
   ```
2. **Install dependencies**:
```
cd cubicle
npm install
```
3. **Setup Environment variables**:
    - Create a `.env` file in the root directory of the project.
    - Add the following environment variables with appropriate values:
    ```
    MONGODB_URI="your_value_here"
    SESSION_NAME = "your_value_here"
    SESSION_SECRET = "your_value_here"
    ADMIN_SECRET_PASS = "your_value_here"

    ```
4. **Run the Application**:
    ```
    npm start
    ```
5. **Access the Application**:
    Open your browser and navigate to `https://localhost:2000` to access Cubicle.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the terms of the [MIT](http://opensource.org/licenses/mit-license) license.
