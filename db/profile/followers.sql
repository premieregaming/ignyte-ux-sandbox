
DROP TABLE IF EXISTS public.followers;

CREATE TABLE public.followers (
	user_id character varying not null,
	follower_id character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
