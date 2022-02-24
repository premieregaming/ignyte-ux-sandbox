#!/usr/bin/env bash
psql postgres -f init.sql
psql ignyte_core -f core.sql
psql ignyte_core -f users.sql
psql ignyte_core -f profile/profile-education.sql
psql ignyte_core -f profile/followers.sql
psql ignyte_core -f profile/friends.sql
psql ignyte_core -f profile/user-xp.sql
psql ignyte_core -f profile/xp-event.sql
psql ignyte_core -f profile/friends.sql
psql ignyte_core -f content/fundraisers.sql
psql ignyte_core -f content/fundraiser-donations.sql
psql ignyte_core -f content/giveaways.sql
psql ignyte_core -f content/giveaway-users.sql
psql ignyte_core -f content/news.sql
psql ignyte_core -f content/polls.sql
psql ignyte_core -f content/post-likes.sql
psql ignyte_core -f content/post-links.sql
psql ignyte_core -f content/post-media.sql
psql ignyte_core -f content/post-tags.sql
psql ignyte_core -f content/posts.sql
psql ignyte_core -f chat/user-chat-content.sql
psql ignyte_core -f chat/user-chat-sessions.sql
psql ignyte_core -f games/game-genres.sql
psql ignyte_core -f games/games.sql


# psql social_demo -f images.sql 
# psql social_demo -f posts.sql
# psql social_demo -f followers.sql
# psql social_demo -f rooms.sql