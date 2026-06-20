#!/usr/bin/env bash
set -e

role=${CONTAINER_ROLE:-app}

if [ "$role" = "app" ]; then
    echo "app started"
    php-fpm

elif [ "$role" = "scheduler" ]; then
    while true
    do
      php /var/www/artisan schedule:run --verbose --no-interaction &
      sleep 60
    done

elif [ "$role" = "queue" ]; then
    echo "Queue started"
    php /var/www/artisan queue:work --verbose --tries=3 --timeout=90

else
    echo "Invalid role used. Exiting..."
    exit 9
fi
