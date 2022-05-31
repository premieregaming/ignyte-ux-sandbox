
DROP TABLE IF EXISTS public.bank;

CREATE TABLE public.bank (
	user_id character varying not null,
	amount character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
