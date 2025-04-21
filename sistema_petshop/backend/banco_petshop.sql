CREATE DATABASE IF NOT EXISTS petshop;
USE petshop;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  nome_pet VARCHAR(100),
  raca VARCHAR(100),
  data_hora DATETIME,
  observacoes TEXT,
  imagem VARCHAR(255),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);