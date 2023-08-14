//Database module for CMS
const mysql = require('mysql2/promise');

let connection;

//Initialize a connection to the MySQL database
async function initializeConnection() {
    connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'XV18124001', database: 'CMS' });
}

//Fetches all departments from the database
async function viewDepartments() {
    const [rows] = await connection.execute('SELECT * FROM department');
    return rows;
}

//Adds a new department to the database
async function addDepartment(name) {
    await connection.execute('INSERT INTO department (name) VALUES (?)', [name]);
}

//Fetches all roles from the database
async function viewRoles() {
    const [rows] = await connection.execute('SELECT * FROM role');
    return rows;
}

//Adds a new role to the database
async function addRole(name, salary, departmentId) {
    await connection.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [name, salary, departmentId]);
}

//Fetches all employees from the database
async function viewEmployees() {
    const [rows] = await connection.execute(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    return rows;
}

//Adds a new employee to the database
async function addEmployee(firstName, lastName, roleId, managerId) {
    await connection.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId || null]);
}

//Update the role of a specific employee
async function updateEmployeeRole(employeeId, roleId) {
    await connection.execute('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

//Retrieves the total salary for each department
async function viewDepartmentSalaries() {
    const [rows] = await connection.execute(`
        SELECT department.name AS department, SUM(role.salary) AS total_budget
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        GROUP BY department.name
    `);
    return rows;
}

//Deletes a department if it has no associated roles
async function deleteDepartment(id) {
    const [roles] = await connection.execute('SELECT * FROM role WHERE department_id = ?', [id]);
    if (roles.length > 0) {
        throw new Error("Department has associated roles and cannot be deleted.");
    }
    await connection.execute('DELETE FROM department WHERE id = ?', [id]);
}

//Deletes a role if it has no associated employees
async function deleteRole(id) {
    const [employees] = await connection.execute('SELECT * FROM employee WHERE role_id = ?', [id]);
    if (employees.length > 0) {
        throw new Error("Role has associated employees and cannot be deleted.");
    }
    await connection.execute('DELETE FROM role WHERE id = ?', [id]);
}

//Deletes an employee
async function deleteEmployee(id) {
    await connection.execute('DELETE FROM employee WHERE id = ?', [id]);
}

//Closes the established database connection
async function closeConnection() {
    await connection.end();
}

//Exports the database functions for external use
module.exports = { initializeConnection, viewDepartments, addDepartment, viewRoles, addRole, viewEmployees, addEmployee, updateEmployeeRole, viewDepartmentSalaries, 
    deleteDepartment, deleteRole, deleteEmployee, closeConnection 
};