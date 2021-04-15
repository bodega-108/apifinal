-- BASE DE DATOS
CREATE DATABASE generador;

USE generador;

CREATE TABLE categoria (
    id           INT(11) AUTO_INCREMENT,
    nombre       VARCHAR(255) NOT NULL,
    CONSTRAINT  pk_categoria PRIMARY KEY (id)

)ENGINE=InnoDB;
CREATE TABLE producto(
    id            INT(11) AUTO_INCREMENT,
    sku           VARCHAR(255) NOT NULL,
    estado        VARCHAR(100) DEFAULT "Pendientes",
    nombre        VARCHAR(255) NOT NULL,
    id_categoria  INT(11) DEFAULT 1,
    precio        DECIMAL(4,2) DEFAULT,
    CONSTRAINT  pk_producto PRIMARY KEY (id),
    CONSTRAINT  fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id)
)ENGINE=InnoDB;