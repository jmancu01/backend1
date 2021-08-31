use prueba;

create table perro (
id INT AUTO_INCREMENT,
name VARCHAR(20),
category VARCHAR(20),
price INT not null default 20,
stock INT UNSIGNED,
PRIMARY KEY(id)
);

INSERT INTO perro
(name, category, price, stock)
VALUES('fideos', 'harinas', 20, 20),
('Leche', 'Lacteos', 40, 30),
('Crema', 'Lacteos', 100, 15);

select * from perro;

delete from perro 
where id=1;

update perro 
set stock= 45
where id=2;

drop table perro;