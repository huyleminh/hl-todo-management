create schema if not exists `hl_todo_management` default character set utf8mb4 default collate utf8mb4_bin;
use hl_todo_management;

create table if not exists auth_domain (
	domain_id int unsigned auto_increment,
    domain_name varchar(100) not null,
    created_date timestamp default current_timestamp,

    constraint PK_AUTH_DOMAIN primary key(domain_id),
    constraint UC_AUTH_DOMAIN_NAME unique(domain_name)
)
engine = InnoDB
default character set = utf8mb4
default collate = utf8mb4_bin;

create table if not exists user (
	user_id int unsigned auto_increment,
    email varchar(50) not null unique,
    password varchar(255) not null,
    user_type tinyint unsigned default 0, -- 0: normal, 1: google, 2: facebook
    date_of_birth date,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    status tinyint unsigned default 1, -- 0: inactive, 1: active
    created_date timestamp default current_timestamp,
    last_updated_date timestamp default current_timestamp on update current_timestamp,

    constraint PK_USER primary key(user_id)
)
engine = InnoDB
default character set = utf8mb4
default collate = utf8mb4_bin;

create table if not exists token (
	user_id int unsigned,
	token_uuid varchar(36),
    refresh_token text not null,
    created_date timestamp default current_timestamp,
    last_updated_date timestamp default current_timestamp on update current_timestamp,
    expires_date timestamp,
    
    constraint PF_TOKEN primary key(user_id, token_uuid)
)
engine = InnoDB
default character set = utf8mb4
default collate = utf8mb4_bin;

alter table token
add constraint FK_USER_TOKEN
foreign key (user_id)
references user(user_id);
