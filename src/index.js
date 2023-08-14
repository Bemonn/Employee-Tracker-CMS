//Main application logic
const { mainMenu, addDepartment, addRole, addEmployee, updateEmployeeRole, deletionMenu, deleteDepartmentPrompt, deleteRolePrompt, deleteEmployeePrompt } = require('./prompts');
const db = require('./database');

//Main function to run the application
async function runApp() {
    await db.initializeConnection();
    
    //Main loop to continuously prompt the user until they choose to exit
    let exit = false;

    while (!exit) {
        const { action } = await mainMenu();

        //Handle the user's choice from the main menu
        switch (action) {
            case 'View all departments':
                const departments = await db.viewDepartments();
                console.table(departments);
                break;

            //Case for adding a new department
            case 'Add a department':
                const department = await addDepartment();
                await db.addDepartment(department.departmentName);
                console.log("Department added successfully!");
                break;

            //Case to view all roles in the database
            case 'View all roles':
                const roles = await db.viewRoles();
                console.table(roles);
                break;

            //Case for adding a new role
            case 'Add a role':
                const role = await addRole();
                await db.addRole(role.roleName, role.salary, role.department);
                console.log("Role added successfully!");
                break;

            //Case to view all employees in the database
            case 'View all employees':
                const employees = await db.viewEmployees();
                console.table(employees);
                break;

            //Case for adding a new employee
            case 'Add an employee':
                const employee = await addEmployee();
                await db.addEmployee(employee.firstName, employee.lastName, employee.role, employee.manager);
                console.log("Employee added successfully!");
                break;

            //Case to update the role of an existing employee
            case 'Update an employee role':
                const updatedEmployee = await updateEmployeeRole();
                await db.updateEmployeeRole(updatedEmployee.employee, updatedEmployee.role);
                console.log("Employee role updated successfully!");
                break;

            //Case to view the total salaries per department
            case 'View department salaries':
                const departmentSalaries = await db.viewDepartmentSalaries();
                console.table(departmentSalaries);
                break;

            //Case to delete a department, role, or employee (shows the user a new menu)
            case 'Delete something':
                let continueDeletion = true;
                while(continueDeletion) {
                    const { deleteChoice } = await deletionMenu();
            
                    switch(deleteChoice) {
                        //Attempt to delete selected department
                        case 'Delete a department':
                            try {
                            const departmentToDelete = await deleteDepartmentPrompt();
                            await db.deleteDepartment(departmentToDelete.departmentId);
                            console.log("Department deleted successfully!");
                            } catch (error) {
                            console.error(error.message);
                            }
                            break;
                        
                        //Attempt to delete selected role
                        case 'Delete a role':
                            try {
                            const roleToDelete = await deleteRolePrompt();
                            await db.deleteRole(roleToDelete.roleId);
                            console.log("Role deleted successfully!");
                            } catch (error) {
                            console.error(error.message);
                            }
                            break;
            
                        //Attempt to delete selected employee
                        case 'Delete an employee':
                            const employeeToDelete = await deleteEmployeePrompt();
                            await db.deleteEmployee(employeeToDelete.employeeId);
                            console.log("Employee deleted successfully!");
                            break;
            
                        //Cancel deletion and return to main menu
                        case 'Cancel':
                            continueDeletion = false;
                            break;
                    }
                }
                break;


            //Case to exit the application
            case 'Exit':
                exit = true;
                await db.closeConnection();
                console.log("Goodbye!");
                break;
        }
    }
}

runApp();