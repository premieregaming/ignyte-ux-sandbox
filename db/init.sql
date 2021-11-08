CREATE USER ignyte_db_admin WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE NOREPLICATION PASSWORD 'insecure_password';
CREATE USER ignyte_api WITH LOGIN PASSWORD 'insecure_password';
CREATE DATABASE ignyte_core WITH OWNER = ignyte_db_admin ENCODING = 'UTF8' CONNECTION LIMIT = -1;
CREATE ROLE ignyte_api_role;
GRANT CONNECT ON DATABASE ignyte_core TO ignyte_api_role;
GRANT USAGE ON SCHEMA PUBLIC TO ignyte_api_role;
GRANT ignyte_api_role to ignyte_api
