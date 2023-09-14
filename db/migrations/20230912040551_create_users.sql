-- migrate:up

CREATE TABLE users(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(180) NOT NULL UNIQUE,
  name VARCHAR(90) NOT NULL,
  last_name VARCHAR(90) NOT NULL,
  phone VARCHAR(90) NOT NULL UNIQUE,
  image VARCHAR(255) NULL,
  password VARCHAR(90) NOT NULL,
  created_at TIMESTAMP(0) NOT NULL,
  updated_at TIMESTAMP(0) NOT NULL
);

-- migrate:down

DROP TABLE users;
