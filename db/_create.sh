#!/usr/bin/env bash
psql postgres -f init.sql
psql ignyte_api -f core.sql
# psql social_demo -f images.sql 
# psql social_demo -f users.sql
# psql social_demo -f posts.sql
# psql social_demo -f followers.sql
# psql social_demo -f rooms.sql