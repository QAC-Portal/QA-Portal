DROP TABLE if exists training.qa_cohort;

create table if not exists training.qa_cohort
(
    id integer not null
        constraint qa_cohort_pk
            primary key,
    cohort_name varchar(50) not null,
    training_pathway varchar(50) not null,
    pathway_version varchar(50) not null,
    trainer_id integer not null,
    last_updated_timestamp timestamp not null,
    last_updated_by varchar(100) not null,
    start_date date not null,
    version integer default 1 not null
);

alter table training.qa_cohort owner to postgres;

INSERT INTO training.qa_cohort(
    id, cohort_name, training_pathway, pathway_version, trainer_id, last_updated_timestamp, last_updated_by, start_date, version)
VALUES (1, 'CI Intake 1', 'Continuous Integration','CI_version_1', 1,current_timestamp , 'admin','2019-03-04', 1);

INSERT INTO training.qa_cohort(
    id, cohort_name, training_pathway, pathway_version, trainer_id, last_updated_timestamp, last_updated_by, start_date, version)
VALUES (2, 'CI Intake 2', 'Continuous Integration','CI_version_2', 1, current_timestamp , 'admin', '2019-06-17', 1);

INSERT INTO training.qa_cohort(
    id, cohort_name, training_pathway, pathway_version, trainer_id, last_updated_timestamp, last_updated_by, start_date, version)
VALUES (3, 'Java Intake 1', 'Development', 'Java_Dev_version_1', 2, current_timestamp , 'admin', '2019-04-15', 1);

INSERT INTO training.qa_cohort(
    id, cohort_name, training_pathway, pathway_version, trainer_id, last_updated_timestamp, last_updated_by, start_date, version)
VALUES (4, 'Java Intake 2', 'Dev-Ops', 'Java_Dev-Ops_version_1', 2, current_timestamp , 'admin', '2019-07-08', 1);

INSERT INTO training.qa_cohort(
    id, cohort_name, training_pathway, pathway_version, trainer_id, last_updated_timestamp, last_updated_by, start_date, version)
VALUES (5, 'Scala Intake 1', 'Development', 'Scala_Dev_version_1', 3, current_timestamp, 'admin', '2019-06-03', 1);
