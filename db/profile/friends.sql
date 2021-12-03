
DROP TABLE IF EXISTS public.friends;

CREATE TABLE public.friends (
	user_id character varying not null,
	friend_id character varying not null,
	is_accepted boolean not null DEFAULT false,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
