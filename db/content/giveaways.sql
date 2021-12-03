
DROP TABLE IF EXISTS public.giveaways;

CREATE TABLE public.giveaways (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	currency_amount character varying not null,
	is_finished boolean not null default false,
	start_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
	end_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
