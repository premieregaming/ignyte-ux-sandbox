
DROP TABLE IF EXISTS public.giveaway_users;

CREATE TABLE public.giveaway_users (
	giveaway_id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	is_winner boolean not null default false,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
