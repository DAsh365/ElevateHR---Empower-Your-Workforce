INSERT INTO department (name) VALUES
('Human Resources'),
('Finance'),
('IT'),
('Marketing'),
('Operations');

INSERT INTO roles (title, salary, department_id) VALUES
('Human Resources Manager', 100000.00, 1),
('Finance Analyst', 80000.00, 2),
('Software Developer', 90000.00, 3),
('Marketing Specialist', 75000.00, 4),
('Operations Manager', 85000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Van', 'Gogh', 1, NULL),      
('Leonardo', 'da Vinci', 2,1),        
('Salvador', 'Dalí', 3, 1),   
('Jackson', 'Pollock', 4, 1), 
('Andy', 'Warhol', 5, 1);  