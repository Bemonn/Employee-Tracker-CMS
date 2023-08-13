const inquirer = require('inquirer');
const db = require('./database');

function mainMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);
}

function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ]);
}

function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: ['Department 1', 'Department 2']  // Placeholder for now
        }
    ]);
}

async function addEmployee() {
    const roles = await db.viewRoles();
    const employees = await db.viewEmployees();

    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })).concat({ name: 'None', value: null })
        }
    ]);
}

async function updateEmployeeRole() {
    const roles = await db.viewRoles();
    const employees = await db.viewEmployees();

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee do you want to update?',
            choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the new role:',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        }
    ]);
}

module.exports = {
    mainMenu,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};