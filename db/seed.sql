INSERT INTO crew (name) VALUES
('Deckhands'),
('Treasury'),
('Navigation'),
('Rum Supply'),
('Crew Operations');

INSERT INTO positions (title, salary, crew_id) VALUES
('Captain', 70000.00, 1),
('Treasure Keeper', 60000.00, 2),
('Ship Navigator', 80000.00, 3),
('Rum Master', 65000.00, 4),
('Operations Officer', 75000.00, 5);

INSERT INTO pirate (first_name, last_name, position_id, captain_id) VALUES
('Blackbeard', 'Pirate', 1, NULL),      
('Anne', 'Bonny', 2,1),        
('Jack', 'Rackham', 3, 1),   
('Calico', 'Jack', 4, 1), 
('Mary', 'Read', 5, 1);  