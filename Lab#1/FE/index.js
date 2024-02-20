function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';

      const list = data.data;
      list.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteEmployee(item.id));
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}
// TODO
// Add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function (event) 
{
  event.preventDefault(); // this prevent page form reloading
  createEmployee();
});
// TODO
// Add event listener to delete button
function addDeleteEventListeners() {
   deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const employeeId = this.parentElement.parentElement.firstElementChild.textContent;
      deleteEmployee(employeeId);
    });
  });
}
// TODO
function createEmployee() {
  const  name = document.getElementById('name').value;
   const id = document.getElementById('id').value;

  const formData = {
    name: name,
    id: id
  };

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees(); // here we ref the emp list so new emp  appears
    })
    .catch(error => console.error(error));
}
// TODO
function deleteEmployee(employeeId) {
  fetch(`http://localhost:3000/api/v1/employee/${employeeId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees(); // Refresh the employee list after deletion
    })
    .catch(error => console.error(error));
}

fetchEmployees(); 
addDeleteEventListeners(); 
