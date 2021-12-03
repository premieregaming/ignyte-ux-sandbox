
DROP TABLE IF EXISTS public.fundraisers;

CREATE TABLE public.fundraisers (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	goal_amount character varying not null,
	start_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
	end_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
