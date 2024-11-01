CREATE database Soderia;
use Soderia;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  email VARCHAR(100),
  localidad VARCHAR(100),
  calle VARCHAR(100),
  altura INT,
  piso VARCHAR(10),
  departamento VARCHAR(10),
  estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

select * from clientes;
