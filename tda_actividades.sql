CREATE DATABASE tda_actividades;
USE tda_actividades;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_papa VARCHAR(100) NOT NULL,
    nombre_niño VARCHAR(100) NOT NULL,
    correo_papa VARCHAR(120) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'padre', 'instructor') DEFAULT 'padre',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE actividades (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_actividad VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    nivel ENUM('facil', 'medio', 'dificil') DEFAULT 'facil'
);

CREATE TABLE lecciones (
    id_leccion INT AUTO_INCREMENT PRIMARY KEY,
    id_actividad INT NOT NULL,
    titulo_leccion VARCHAR(100) NOT NULL,
    contenido TEXT,
    FOREIGN KEY (id_actividad) REFERENCES actividades(id_actividad)
);

CREATE TABLE progreso (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_leccion INT NOT NULL,
    porcentaje DECIMAL(5,2) DEFAULT 0.00,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_leccion) REFERENCES lecciones(id_leccion)
);

CREATE TABLE insignias (
    id_insignia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_insignia VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255)
);

CREATE TABLE insignias_obtenidas (
    id_usuario INT NOT NULL,
    id_insignia INT NOT NULL,
    fecha_obtenida DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_insignia),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_insignia) REFERENCES insignias(id_insignia)
);

