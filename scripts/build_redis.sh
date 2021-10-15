# Clarify script in heroku-postbuild

wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
export REDIS_PATH="$(pwd)"
make
PATH="${REDIS_PATH}${PATH:+:${PATH}}"
redis-server