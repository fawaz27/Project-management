--DROP SCHEMA project CASCADE;;
CREATE SCHEMA project;
-- ddl-end --

SET search_path TO pg_catalog,public,project;
-- ddl-end --

-- object: project.tasks | type: TABLE --
-- DROP TABLE IF EXISTS project.tasks CASCADE;
CREATE TABLE project.tasks (
	id bigserial NOT NULL,
	task jsonb,
	id_projects bigint,
	CONSTRAINT tasks_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: project.projects | type: TABLE --
-- DROP TABLE IF EXISTS project.projects CASCADE;
CREATE TABLE project.projects (
	id bigserial NOT NULL,
	project jsonb,
	CONSTRAINT projects_pk PRIMARY KEY (id)

);
-- ddl-end --

-- object: projects_fk | type: CONSTRAINT --
-- ALTER TABLE project.tasks DROP CONSTRAINT IF EXISTS projects_fk CASCADE;
ALTER TABLE project.tasks ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects)
REFERENCES project.projects (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: project.subprojects | type: TABLE --
-- DROP TABLE IF EXISTS project.subprojects CASCADE;
CREATE TABLE project.subprojects (
	id_projects bigint NOT NULL,
	id_projects1 bigint NOT NULL,
	project jsonb,
	CONSTRAINT subprojects_pk PRIMARY KEY (id_projects,id_projects1)

);
-- ddl-end --

-- object: projects_fk | type: CONSTRAINT --
-- ALTER TABLE project.subprojects DROP CONSTRAINT IF EXISTS projects_fk CASCADE;
ALTER TABLE project.subprojects ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects)
REFERENCES project.projects (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: projects_fk1 | type: CONSTRAINT --
-- ALTER TABLE project.subprojects DROP CONSTRAINT IF EXISTS projects_fk1 CASCADE;
ALTER TABLE project.subprojects ADD CONSTRAINT projects_fk1 FOREIGN KEY (id_projects1)
REFERENCES project.projects (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- -- object: project.partners | type: TABLE --
-- -- DROP TABLE IF EXISTS project.partners CASCADE;
-- CREATE TABLE project.partners (
-- 	id bigserial NOT NULL,
-- 	partner jsonb,
-- 	CONSTRAINT users_pk PRIMARY KEY (id)
-- 
-- );
-- -- ddl-end --
-- 
-- object: project.members | type: TABLE --
-- DROP TABLE IF EXISTS project.members CASCADE;
CREATE TABLE project.members (
	id_partners bigint NOT NULL,
	id_projects bigint NOT NULL,
	member jsonb,
	CONSTRAINT members_pk PRIMARY KEY (id_partners,id_projects)

);
-- ddl-end --

-- object: partners_fk | type: CONSTRAINT --
-- ALTER TABLE project.members DROP CONSTRAINT IF EXISTS partners_fk CASCADE;
ALTER TABLE project.members ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners)
REFERENCES project.partners (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: projects_fk | type: CONSTRAINT --
-- ALTER TABLE project.members DROP CONSTRAINT IF EXISTS projects_fk CASCADE;
ALTER TABLE project.members ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects)
REFERENCES project.projects (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: project.users_tasks | type: TABLE --
-- DROP TABLE IF EXISTS project.users_tasks CASCADE;
CREATE TABLE project.users_tasks (
	id_tasks bigint NOT NULL,
	id_partners bigint NOT NULL,
	task jsonb,
	CONSTRAINT users_tasks_pk PRIMARY KEY (id_tasks,id_partners)

);
-- ddl-end --

-- object: tasks_fk | type: CONSTRAINT --
-- ALTER TABLE project.users_tasks DROP CONSTRAINT IF EXISTS tasks_fk CASCADE;
ALTER TABLE project.users_tasks ADD CONSTRAINT tasks_fk FOREIGN KEY (id_tasks)
REFERENCES project.tasks (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: partners_fk | type: CONSTRAINT --
-- ALTER TABLE project.users_tasks DROP CONSTRAINT IF EXISTS partners_fk CASCADE;
ALTER TABLE project.users_tasks ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners)
REFERENCES project.partners (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --
































