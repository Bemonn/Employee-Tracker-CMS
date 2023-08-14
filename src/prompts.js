//Inquirer module to handle user prompts
const inquirer = require('inquirer');
const db = require('./database');

//Main menu prompt for the user to select an action
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

//Prompt user to select a deletion action from the menu
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

//Prompt user to provide details for a new department
function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ]);
}

//Prompt user to provide details for a new role
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

//Prompt user to provide details for a new employee
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

//Prompt user to select an employee and assign a new role
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

//Prompt user to select a department to delete
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

//Prompt user to select a role to delete
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

//Prompt user to select an employee to delete
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

//Exports the prompt functions for use in other modules
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
