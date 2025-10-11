#!/bin/sh
set -e

if [ -z "$1" ]; then
    echo "Error: tag is required."
    exit 1
fi

tag="$1"

# Build Application Image
echo "Building Application Image..."
#docker build --no-cache -t hub.ar5.in/rolify/app:"$tag" -f docker/common/php-fpm/Dockerfile --target production --push .
docker build -t hub.ar5.in/rolify/app:"$tag" -f docker/common/php-fpm/Dockerfile --target production --push .

# Build Web Server Image
echo "Building Web Server Image..."
#docker build --no-cache -t hub.ar5.in/rolify/web:"$tag" -f docker/production/nginx/Dockerfile --push .
docker build -t hub.ar5.in/rolify/web:"$tag" -f docker/production/nginx/Dockerfile --push .

echo "Images built and pushed successfully."
