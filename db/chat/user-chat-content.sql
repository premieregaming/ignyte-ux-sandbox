
DROP TABLE IF EXISTS public.user_chat_content;

CREATE TABLE public.user_chat_content (
	chat_id uuid DEFAULT public.gen_random_uuid() PRIMARY KEY,
	content character varying not null,
	create_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
