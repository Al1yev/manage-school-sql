CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION pgcrypto;

CREATE TABLE student (
  id uuid DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  course INT,
  course_letter VARCHAR(255) NOT NULL,
  class_id INT,
  attendance FLOAT,
  role VARCHAR(255) DEFAULT 'user',
  teacher_id uuid,
  parents_id uuid,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (teacher_id) REFERENCES teacher (id),
  FOREIGN KEY (parents_id) REFERENCES parent (id)
);

INSERT INTO student (first_name, last_name, course, course_letter, attendance, role, email, password)
  VALUES ('Anvar', 'Aliyev', 3, 'E', 90.0, 'student', 'aliyev_aliyev', 'Aliyev_4380');
  

CREATE TABLE parent (
  id uuid DEFAULT uuid_generate_v4(),
  name_first VARCHAR(255) NOT NULL,
  name_last VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'user',
  login VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE teacher (
  id uuid DEFAULT uuid_generate_v4(),
  name_first VARCHAR(255) NOT NULL,
  name_last VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'teacher',
  login VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE email (
  id uuid DEFAULT uuid_generate_v4(),  
  role VARCHAR(255) NOT NULL,  
  PRIMARY KEY(id)
);

