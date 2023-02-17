create database crud_usuarios;

create table if not exists users (
		"id" SERIAL primary key,
		"name" VARCHAR(20) not null,
		"email" VARCHAR(100) unique not null,
		"password" VARCHAR(120) not null,
		"admin" BOOLEAN default false not null,
		"active" BOOLEAN default true not null
);