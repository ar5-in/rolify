#!/usr/bin/env bash
set -e

role=${CONTAINER_ROLE:-app}

if [ "$role" = "app" ]; then
    echo "app started"
    exec php-fpm

elif [ "$role" = "scheduler" ]; then
    echo "Scheduler started"
    # Use long-running scheduler worker for better signal handling and less overhead
    exec php /var/www/artisan schedule:work --verbose --no-interaction

elif [ "$role" = "queue" ]; then
    echo "Queue started"
    # Standardized worker flags (moved from compose.dev.yaml)
    exec php /var/www/artisan queue:work --queue=default,emails --tries=3 --timeout=120 --verbose

else
    echo "Invalid role used. Exiting..."
    exit 9
fi
