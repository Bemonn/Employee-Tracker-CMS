# Employee-Tracker-CMS

  ![GitHub](https://img.shields.io/badge/license-mit-blue)

  ## Description
  A command line application that allows user's to keep track of employees through a various amount of ways.

  Using sql the user is able to see and manage departments, roles and employees as well as other features about these such as salary, who an employees manager is and the salary of a department.

  ## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Video](#video)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#Questions)
  
  ## Installation
  To install and use:
  1. Open intergrated terminal and run 'npm install'
  2. This will install modules which is ignored by .gitignore
  3. Using SQL command line tool run 'mysql -u yourUsername -p < schema.sql'
  4. Then run seeds.sql by doing 'mysql -u [username] -p[password] [database_name] < seeds.sql'
  5. This will populate the table and should give it the deafult name of 'cms'

  ## Video
  

  
  ## Usage
  The user needs to open the intergrated terminal within the src folder and then run 'node index.js', the user will then be prompted with the following screen:




  The user can then navigate using arrow keys to select any prompt they want:



   Users will have access to the following prompts:
   - View all departments
   - View all roles
   - View all employees
   - Add a department
   - Add a role
   - Add an employee
   - Update an employee role
   - View department salaries
   - Delete something *note this will take the user to a new menu for deleting



   You will be unable to delete a department or role that has other dependencies within it
  
  ## Contributing
  Refer to questions for contact details

  
  ## License
  MIT

  ## Questions
For any questions, please feel free to reach out through the following channels:
- Email: tristan2107b@gmail.com
- Github: [bemonn](https://github.com/bemonn)