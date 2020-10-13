INSERT INTO departments(department_name)
VALUES 
("Management"),
("Marketing"),
("Production"),
("Research and Development"),
("Human Resources"),
("Accounting");

INSERT INTO roles(title, salary, department_id)
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

INSERT INTO employees(first_name, last_name, role_id) 
VALUES
("Marie", "Curie", 1),
("Anaïs", "Nin", 2),
("Toni", "Morrison", 3),
("Ada", "Lovelace", 4),
("Jane", "Goodall", 5)
("Sojourner", "Truth", 6);
("Rosalind", "Franklin", 7),
("Harriet", "Beecher Stowe", 7),
("Vera", "Atkins", 8),
("Gail", "Laughlin", 8),
("Mary", "Seacole", 9),
("Madeleine", "Albright", 10),
("Sandra", "Day O'Connor", 10);

UPDATE `employee_db`.`employees` SET `manager_id` = "1" WHERE (`id` > "1");
