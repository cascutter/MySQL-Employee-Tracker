USE employee_db;

INSERT INTO department(name)
VALUES 
("Management"),
("Marketing"),
("Production"),
("Research and Development"),
("Human Resources"),
("Accounting");

INSERT INTO role(title, salary, department_id)
VALUES
("Executive", 200000, 1),
("Marketing Manager", 120000, 1),
("Production Supervisor", 120000, 1),
("R&D Team Lead", 170000, 1),
("Marketing Analyst", 70000, 2),
("Copywriter", 50000, 2),
("Test Engineer", 140000, 3),
("Engineer", 150000, 4),
("HR Rep", 75000, 5),
("Accountant", 92000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES
("Marie", "Curie", 1, null),
("Anaïs", "Nin", 2, 1),
("Toni", "Morrison", 3, 1),
("Ada", "Lovelace", 4, 1),
("Jane", "Goodall", 5, 2),
("Sojourner", "Truth", 6, 2),
("Rosalind", "Franklin", 7, 3),
("Harriet", "Beecher Stowe", 7, 3),
("Vera", "Atkins", 8, 4),
("Gail", "Laughlin", 8, 4),
("Mary", "Seacole", 9, null),
("Madeleine", "Albright", 10, null),
("Sandra", "Day O'Connor", 10, null);