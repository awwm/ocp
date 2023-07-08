#!/usr/bin/env sh

# Install WordPress.
wp core install \
    --path="/var/www/html" \
    --url="http://localhost:${WORDPRESS_PORT}" \
    --title="${WORDPRESS_TITLE}" \
    --admin_user="${WORDPRESS_ADMIN_USER}" \
    --admin_password="${WORDPRESS_ADMIN_PASSWORD}" \
    --admin_email="${WORDPRESS_ADMIN_EMAIL}"

# Update permalink structure.
wp option update \
    permalink_structure "${WORDPRESS_PERMALINK_STRUCTURE}" \
    --skip-themes \
    --skip-plugins

echo -e "\nREPORT\n"

echo "WORDPRESS_DOMAIN: http://localhost:${WORDPRESS_PORT}"

# List users
echo "== User List =="
wp user list
echo ""
