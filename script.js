document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phnumber = document.querySelector('#phnumber').value;
    const id = document.querySelector('#id').value;

    // Validate the input fields
    if (!name || !email || !phnumber || !id) {
        alert('Please fill out all fields.');
        return;
    }

    // Create a student object
    const student = {
        name: name,
        email: email,
        phnumber: phnumber,
        id: id
    };

    // Retrieve the students array from localStorage, or create a new one if it doesn't exist
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Add the new student to the array
    students.push(student);

    // Save the updated array back to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Clear the form fields
    document.querySelector('#form').reset();

    // Update the display of students
    displayStudents();

    alert('Student registered successfully');
});

// Function to display students in the container
function displayStudents() {
    const container = document.querySelector('#container');
    container.innerHTML = ''; // Clear the container

    let students = JSON.parse(localStorage.getItem('students')) || [];

    students.forEach((student, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');

        studentDiv.innerHTML = `
            <p>Name: ${student.name}</p>
            <p>ID: ${student.id}</p>
            <p>Email: ${student.email}</p>
            <p>Phone Number: ${student.phnumber}</p>
            <span id='buttoncont'>
            <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </span>
           
        `;

        container.appendChild(studentDiv);
    });
}

// Function to delete a student
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1); // Remove the student from the array

    localStorage.setItem('students', JSON.stringify(students)); // Save the updated array

    displayStudents(); // Refresh the display
}

// Function to edit a student
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const student = students[index];
    document.querySelector('#name').value = student.name;
    document.querySelector('#email').value = student.email;
    document.querySelector('#phnumber').value = student.phnumber;
    document.querySelector('#id').value = student.id;

    deleteStudent(index); // Remove the student so that the new entry can replace it
}

// Call displayStudents when the page loads to show any existing students
document.addEventListener('DOMContentLoaded', displayStudents);
