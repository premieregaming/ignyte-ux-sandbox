CREATE TABLE xp_event (
	user_id uuid NOT NULL,
	event_type integer NOT NULL,
	create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)