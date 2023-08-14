--Seed departments
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Human Resources');

--Seed roles
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 75000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 60000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 65000.00, 3);

--Seed employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Robert', 'Johnson', 3, 1);