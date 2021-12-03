
DROP TABLE IF EXISTS public.user_chat_sessions;

CREATE TABLE public.user_chat_sessions (
	id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	user_id character varying not null,
	friend_id character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
