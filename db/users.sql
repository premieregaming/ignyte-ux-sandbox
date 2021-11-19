
DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	email character varying UNIQUE,
	first_name character varying NOT NULL,
	last_name character varying NOT NULL,
	google_account_id character varying,
	fb_account_id character varying,
	password_hash character varying,
	profile_photo character varying,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS public.google_user_accounts;

CREATE TABLE public.google_user_accounts (
	user_id character varying not null,
	google_id character varying not null,
	email character varying UNIQUE NOT NULL,
	first_name character varying NOT NULL,
	last_name character varying NOT NULL,
	profile_photo character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
