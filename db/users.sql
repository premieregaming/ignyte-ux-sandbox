CREATE TABLE public.users (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	email character varying UNIQUE NOT NULL,
	first_name character varying NOT NULL,
	last_name character varying NOT NULL,
	google_account_id character varying NOT NULL,
	fb_account_id character varying NOT NULL,
	password_hash character varying,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.google_user_accounts (
	id character varying not null,
	email character varying UNIQUE NOT NULL,
	first_name character varying NOT NULL,
	last_name character varying NOT NULL,
	profile_photo character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
