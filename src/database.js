const mysql = require('mysql2/promise');

let connection;

async function initializeConnection() {
    connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Tb19122001', database: 'CMS' });
}

async function viewDepartments() {
    const [rows] = await connection.execute('SELECT * FROM department');
    return rows;
}

async function addDepartment(name) {
    await connection.execute('INSERT INTO department (name) VALUES (?)', [name]);
}

async function viewRoles() {
    const [rows] = await connection.execute('SELECT * FROM role');
    return rows;
}

async function addRole(name, salary, departmentId) {
    await connection.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [name, salary, departmentId]);
}

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

async function addEmployee(firstName, lastName, roleId, managerId) {
    await connection.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId || null]);
}

async function updateEmployeeRole(employeeId, roleId) {
    await connection.execute('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

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

async function closeConnection() {
    await connection.end();
}

module.exports = { initializeConnection, viewDepartments, addDepartment, viewRoles, addRole, viewEmployees, addEmployee, updateEmployeeRole, viewDepartmentSalaries, closeConnection };