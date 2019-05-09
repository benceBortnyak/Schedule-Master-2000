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

CREATE TYPE role AS ENUM ('GUEST','USER','ADMIN');


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(30),
    password VARCHAR(60),
    user_type role
);

CREATE  TABLE schedules (
    schedule_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(60)
);

CREATE TABLE columns (
    column_id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES schedules(schedule_id),
    title VARCHAR(60)
);

CREATE TABLE slots (
    slot_id SERIAL PRIMARY KEY,
    column_id INT REFERENCES columns(column_id),
    hour INT
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(60)
);

create table slots_tasks (
    slot_id INT references slots(slot_id),
    task_id INT references tasks(task_id)
);


CREATE OR REPLACE FUNCTION day_column() RETURNS trigger AS $day_collum$
    DECLARE
        ID int;
        columnTitle varchar(60);
    BEGIN
    SELECT columns.column_id INTO ID FROM columns WHERE max(column_id);
    SELECT columns.title INTO columnTitle FROM columns WHERE max(column_id);
    insert into columns(schedule_id, title) values (ID,columnTitle);
    for i in 1..7
        loop
        FOR i in 1..24
        loop
            INSERT INTO slots(column_id, hour) values (ID,i);
        end loop;
    END LOOP;
    RETURN null;
    END
    $day_collum$ LANGUAGE plpgsql;

CREATE TRIGGER day_trigger
    AFTER INSERT ON schedules
    FOR EACH ROW EXECUTE PROCEDURE day_column();

insert into users (email, password, user_type) values ('admin@admin.com', 'Admin1234', 'ADMIN');
