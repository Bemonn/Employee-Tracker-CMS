
const { mainMenu, addDepartment, addRole, addEmployee } = require('./prompts');
const db = require('./database');

async function initializeApp() {
    await db.initializeConnection();

async function runApp() {
    await db.initializeConnection();
    
    let exit = false;

    while (!exit) {
        const { action } = await mainMenu();

        switch (action) {
            case 'View all departments':
                const departments = await db.viewDepartments();
                console.table(departments);
                break;

            case 'Add a department':
                const department = await addDepartment();
                await db.addDepartment(department.departmentName);
                console.log("Department added successfully!");
                break;

            case 'View all roles':
                const roles = await db.viewRoles();
                console.table(roles);
                break;

            case 'Add a role':
                const role = await addRole();
                await db.addRole(role.roleName, role.salary, role.department);
                console.log("Role added successfully!");
                break;

            case 'View all employees':
                const employees = await db.viewEmployees();
                console.table(employees);
                break;

            case 'Add an employee':
                const employee = await addEmployee();
                await db.addEmployee(employee.firstName, employee.lastName);
                console.log("Employee added successfully!");
                break;

            case 'Exit':
                exit = true;
                await db.closeConnection();
                console.log("Goodbye!");
                break;
        }
    }
}

runApp();

}

initializeApp();