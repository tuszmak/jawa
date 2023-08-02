create table if not exists ingredient
(
    id   serial primary key,
    name varchar not null
);
create table if not exists recipe
(
    id           serial  not null,
    name         varchar not null,
    instructions text,
    ingredient_id_list  int[]
);
insert into ingredient (name)
values ('valami');

insert into recipe values (
                           1,
                           'Sajtosperec',
                           'Just do it',
                             '{1,2,3}'
                          );