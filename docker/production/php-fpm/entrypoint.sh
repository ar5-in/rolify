#!/bin/sh
set -e

# export Docker Secrets as Environment Variables
# -----------------------------------------------------------

echo "Exported fake env for testing"
export "FAKE_ENV=Fake"

for VAR in $(env | grep '_FILE=' | cut -d= -f1); do
    FILE=$(printenv "$VAR")
    NAME=${VAR%_FILE}

    export "$NAME=$(cat "$FILE")"
    echo "Exported ${NAME}"
    unset "$VAR"
done

# Initialize storage directory if empty
# -----------------------------------------------------------
# If the storage directory is empty, copy the initial contents
# and set the correct permissions.
# -----------------------------------------------------------
if [ ! "$(ls -A /var/www/storage)" ]; then
  echo "Initializing storage directory..."
  cp -R /var/www/storage-init/. /var/www/storage
  chown -R www-data:www-data /var/www/storage
fi

# Remove storage-init directory
rm -rf /var/www/storage-init

if [ "$(ls -A /var/www/frontend-assets)" ]; then
    echo "Syncing frontend assets..."
    rsync -av --delete /var/www/frontend-assets/ /var/www/public/build/
fi

# Run Laravel migrations
# -----------------------------------------------------------
# Ensure the database schema is up to date.
# -----------------------------------------------------------
php artisan migrate --force

# Clear and cache configurations
# -----------------------------------------------------------
# Improves performance by caching config and routes.
# -----------------------------------------------------------
php artisan config:cache
php artisan route:cache

# Run the default command
exec "$@"
