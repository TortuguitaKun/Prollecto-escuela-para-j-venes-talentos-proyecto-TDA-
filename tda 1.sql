CREATE DATABASE plataforma_cursos;
USE plataforma_cursos;


CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('estudiante','instructor','admin') DEFAULT 'estudiante',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cursos (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    id_instructor INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_instructor) REFERENCES usuarios(id_usuario)
);

CREATE TABLE lecciones (
    id_leccion INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT,
    titulo VARCHAR(150) NOT NULL,
    contenido TEXT,
    orden INT DEFAULT 1,
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
);

CREATE TABLE progreso (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_leccion INT,
    completado BOOLEAN DEFAULT 0,
    fecha_completado DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_leccion) REFERENCES lecciones(id_leccion)
);


CREATE TABLE insignias (
    id_insignia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    icono VARCHAR(255)
);

CREATE TABLE usuarios_insignias (
    id_usuario INT,
    id_insignia INT,
    fecha_obtenida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_insignia),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_insignia) REFERENCES insignias(id_insignia)
);
