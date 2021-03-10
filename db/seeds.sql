use employee;

INSERT INTO department
    (names)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Leagl");

INSERT INTO role
    (title salary, department_id)
VALUES
    ("Sales Lead", 10000, 1), 
    ("Salesperson", 100, 1),
    ("Lead Engineer", 10200, 4),
    ("Software Engineer", 15000, 3),
    ("Accountant", 10000, 5),
    ("Laywer", 10000, 9);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 5, 2),
    ("Mark", "Steal", 2, 6),
    ("Luke", "Moe", 33, 6),
    ("Steve", "Lanne", 77, 3),
    ("Josheph", "Poe", 4, 34),
    ("Mike", "Jackson", 7, 4);