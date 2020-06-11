USE employee_trackerDB;

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");

INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Accountant", 95000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accounting Assistant", 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Main Sales Rep", 85000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Coordinator", 55000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Kevin", "Chen", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Rayna", "Simones", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Carl", "Berry", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Keri", "Wilson", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Greg", "Garcia", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Alan", "Cho", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Lily", "Tran", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("David", "Liu", 6, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Fred", "Anderson", 6, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;