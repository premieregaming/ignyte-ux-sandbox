#!/usr/bin/env bash
psql postgres -f init.sql
psql ignyte_core -f core.sql
psql ignyte_core -f users.sql
# psql social_demo -f images.sql 
# psql social_demo -f posts.sql
# psql social_demo -f followers.sql
# psql social_demo -f rooms.sql