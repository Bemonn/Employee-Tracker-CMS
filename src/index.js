const { mainMenu, addDepartment, addRole, addEmployee } = require('./prompts');

async function runApp() {
    let exit = false;

    while (!exit) {
        const { action } = await mainMenu();

        switch (action) {
            case 'View all departments':
                // Logic to view all departments
                break;
            case 'Add a department':
                const department = await addDepartment();
                // Logic to add department to DB using department.departmentName
                break;
            // ... Handle other cases similarly
            case 'Exit':
                exit = true;
                break;
        }
    }
}

runApp();