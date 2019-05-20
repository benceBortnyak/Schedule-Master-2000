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
    email VARCHAR(30),
    password VARCHAR(60),
    user_type role
);

CREATE TABLE schedules (
    schedule_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(60),
    length int,
    CHECK (0 < length)
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
    title VARCHAR(60),
    type task_type,
    content text
);

create table slots_tasks (
    slot_id INT references slots(slot_id),
    task_id INT references tasks(task_id)
);

CREATE OR REPLACE FUNCTION day_column() RETURNS trigger AS $day_collum$
DECLARE
    sched_id int;
    columnTitle varchar(60);
    col_id int;
    times int;
BEGIN
    SELECT column_id into col_id from columns where schedule_id = new.schedule_id;
    select schedule_id into sched_id from schedules where schedule_id = new.schedule_id;
    SELECT title into columnTitle FROM schedules where schedule_id = new.schedule_id;
    select length INTO times FROM schedules where schedule_id = sched_id;
    for i in 1 .. times
    loop
        insert into columns(schedule_id, title) values (sched_id,columnTitle);
        FOR i in 1..24
        loop
            INSERT INTO slots(column_id, hour) values (col_id,i);
        end loop;
    END LOOP;
    RETURN null;
END
$day_collum$ LANGUAGE plpgsql;

CREATE TRIGGER day_trigger
    AFTER INSERT ON schedules
    FOR EACH ROW EXECUTE PROCEDURE day_column();

insert into users (email, password, user_type) values ('admin@admin.com', 'Admin1234', 'ADMIN');
insert into users(email, password, user_type) VALUES ('user1@user1.com','User1','USER');
insert into schedules(user_id, title, length) values (1, 'asd',6);
insert into schedules(user_id, title, length) values (1, 'asdasd',4);
insert into tasks(user_id, title, type, content) values(1,'Gardening','PUBLIC','I love gardening');
select * from schedules;
select * from users;
select * from columns;
