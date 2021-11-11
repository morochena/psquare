#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /run/enki/tmp/pids/server.pid

# Since we're sort of using the asset pipeline, compile assets
# bundle exec rails assets:precompile

# Migrate database if necessary 
bundle exec rails db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"