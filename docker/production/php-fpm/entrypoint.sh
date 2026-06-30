#!/bin/sh
set -e

# export Docker Secrets as Environment Variables
# -----------------------------------------------------------
for VAR in $(env | grep '_FILE=' | cut -d= -f1); do
    FILE=$(printenv "$VAR")
    NAME=${VAR%_FILE}

    export "$NAME=$(cat "$FILE")"
    echo "Exported ${NAME}"
    unset "$VAR"
done

if [ "${CONTAINER_ROLE:-app}" = "app" ]; then
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

    if [ "$(ls -A /var/www/frontend-assets)" ]; then
        echo "Syncing frontend assets..."
        rm -rf /var/www/public/build/* /var/www/public/build/.* 2>/dev/null || true
        cp -R /var/www/frontend-assets/. /var/www/public/build/
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
fi

# 3. Clean up the initialization directory safely
if [ "${CONTAINER_ROLE:-app}" = "app" ]; then
    if [ -d /var/www/storage-init ]; then
        rm -rf /var/www/storage-init
    fi

    if [ -d /var/www/frontend-assets ]; then
        rm -rf /var/www/frontend-assets
    fi
fi

# Run the default command
exec "$@"
