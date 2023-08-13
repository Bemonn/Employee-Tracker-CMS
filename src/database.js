const mysql = require('mysql2/promise');

let connection;

async function initializeConnection() {
    connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Tb19122001', database: 'CMS' });
}

async function viewDepartments() {
    const [rows] = await connection.execute('SELECT * FROM departments');
    return rows;
}

async function addDepartment(name) {
    await connection.execute('INSERT INTO departments (name) VALUES (?)', [name]);
}

async function viewRoles() {
    const [rows] = await connection.execute('SELECT * FROM roles');
    return rows;
}

async function addRole(name, salary, departmentId) {
    await connection.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [name, salary, departmentId]);
}

async function viewEmployees() {
    const [rows] = await connection.execute(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id 
        LEFT JOIN departments ON roles.department_id = departments.id 
        LEFT JOIN employees manager ON employees.manager_id = manager.id
    `);
    return rows;
}

async function addEmployee(firstName, lastName, roleId, managerId) {
    await connection.execute('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId || null]);
}

async function updateEmployeeRole(employeeId, roleId) {
    await connection.execute('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

async function closeConnection() {
    await connection.end();
}

module.exports = { initializeConnection, viewDepartments, addDepartment, viewRoles, addRole, viewEmployees, addEmployee, updateEmployeeRole, closeConnection };