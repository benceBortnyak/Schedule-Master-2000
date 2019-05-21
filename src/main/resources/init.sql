SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_with_oids = false;
SET search_path TO public;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS columns cascade;
DROP TABLE IF EXISTS schedules cascade;
DROP TABLE IF EXISTS tasks cascade;
DROP TABLE IF EXISTS slots cascade;
DROP TABLE IF EXISTS slots_tasks cascade;

drop type if exists role;
CREATE TYPE role AS ENUM ('USER','ADMIN');

DROP TYPE IF EXISTS task_type;
create type task_type as enum ('PUBLIC','PRIVATE');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    forename VARCHAR(30),
    lastName VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(60),
    user_type role
);

CREATE TABLE schedules (
    schedule_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    title VARCHAR(60),
    length int
);

CREATE TABLE columns (
    column_id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(schedule_id) NOT NULL,
    title VARCHAR(60)
);

CREATE TABLE slots (
    slot_id SERIAL PRIMARY KEY,
    column_id INT REFERENCES columns(column_id) NOT NULL,
    hour INT
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(60),
    type task_type,
    content text
);

create table slots_tasks (
    slot_id INTEGER,
    task_id INTEGER,
    FOREIGN KEY (slot_id) REFERENCES  slots(slot_id),
    FOREIGN KEY (task_id) REFERENCES  tasks(task_id)
);

CREATE TRIGGER day_trigger
    AFTER INSERT ON schedules
    FOR EACH ROW EXECUTE PROCEDURE day_column();

CREATE OR REPLACE FUNCTION day_column() RETURNS trigger AS '

    DECLARE
    c_id INT;
    s_id INT;
    BEGIN
        for i in 1 .. new.length
            loop
                insert into columns(schedule_id, title) values (new.schedule_id, new.title) returning column_id INTO c_id;
                FOR i in 1..24
                    loop
                        INSERT INTO slots(column_id, hour) values (c_id,i) returning slot_id INTO s_id;
                        INSERT INTO slots_tasks(slot_id) VALUES (s_id);
                    end loop;
            END LOOP;
        RETURN null;
    END
' LANGUAGE plpgsql;

insert into users (email, password, user_type) values ('admin@admin.com', 'Admin1234', 'ADMIN');
insert into users(email, password, user_type) VALUES ('user1@user1.com', 'user1234', 'USER');
insert into schedules(user_id, title, length) values (1, 'asd',6);
insert into schedules(user_id, title, length) values (1, 'asdasd',4);
insert into tasks(task_id,user_id,title,type,content) values(1, 2, 'Gardening', 'PUBLIC', 'I really love gardening!');
select * from schedules;
select * from users;
select * from columns;
