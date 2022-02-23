#!/usr/bin/env bash
psql -d $DB_URL < init.sql
psql -d $DB_URL -U ignyte_db_admin < core.sql
psql -d $DB_URL -U ignyte_db_admin < users.sql
psql -d $DB_URL -U ignyte_db_admin < profile/profile-education.sql
psql -d $DB_URL -U ignyte_db_admin < profile/friends.sql
psql -d $DB_URL -U ignyte_db_admin < profile/followers.sql
psql -d $DB_URL -U ignyte_db_admin < profile/user-xp.sql
psql -d $DB_URL -U ignyte_db_admin < profile/xp-event.sql
psql -d $DB_URL -U ignyte_db_admin < content/fundraisers.sql
psql -d $DB_URL -U ignyte_db_admin < content/fundraiser-donations.sql
psql -d $DB_URL -U ignyte_db_admin < content/giveaways.sql
psql -d $DB_URL -U ignyte_db_admin < content/giveaway-users.sql
psql -d $DB_URL -U ignyte_db_admin < content/news.sql
psql -d $DB_URL -U ignyte_db_admin < content/polls.sql
psql -d $DB_URL -U ignyte_db_admin < content/post-likes.sql
psql -d $DB_URL -U ignyte_db_admin < content/post-links.sql
psql -d $DB_URL -U ignyte_db_admin < content/post-media.sql
psql -d $DB_URL -U ignyte_db_admin < content/post-tags.sql
psql -d $DB_URL -U ignyte_db_admin < content/posts.sql
psql -d $DB_URL -U ignyte_db_admin < chat/user-chat-content.sql
psql -d $DB_URL -U ignyte_db_admin < chat/user-chat-sessions.sql
psql -d $DB_URL -U ignyte_db_admin < games/game-genres.sql
