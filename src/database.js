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

async function closeConnection() {
    await connection.end();
}

module.exports = { initializeConnection, viewDepartments, addDepartment, closeConnection };