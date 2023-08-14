const { mainMenu, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./prompts');
const db = require('./database');

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
                await db.addEmployee(employee.firstName, employee.lastName, employee.role, employee.manager);
                console.log("Employee added successfully!");
                break;

            case 'Update an employee role':
                const updatedEmployee = await updateEmployeeRole();
                await db.updateEmployeeRole(updatedEmployee.employee, updatedEmployee.role);
                console.log("Employee role updated successfully!");
                break;

            case 'View department salaries':
                const departmentSalaries = await db.viewDepartmentSalaries();
                console.table(departmentSalaries);
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