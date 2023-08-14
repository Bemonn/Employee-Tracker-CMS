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
                'View department salaries',
                'Delete something',
                'Exit'
            ]
        }
    ]);
}

function deletionMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'deleteChoice',
            message: 'What would you like to delete?',
            choices: [
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Cancel'
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

async function addRole() {
    const departments = await db.viewDepartments();

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
            choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
        }
    ]);
}

async function addEmployee() {
    const roles = await db.viewRoles();
    const employees = await db.viewEmployees();

    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?'
        },
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

async function deleteDepartmentPrompt() {
    const departments = await db.viewDepartments();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department would you like to delete?',
            choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
        }
    ]);
}

async function deleteRolePrompt() {
    const roles = await db.viewRoles();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Which role would you like to delete?',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        }
    ]);
}

async function deleteEmployeePrompt() {
    const employees = await db.viewEmployees();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to delete?',
            choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        }
    ]);
}

module.exports = {
    mainMenu,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    deletionMenu,
    deleteDepartmentPrompt,
    deleteRolePrompt,
    deleteEmployeePrompt
};
