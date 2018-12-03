update todo
set todo=$2
where id = $1;
select * from todo
order by id