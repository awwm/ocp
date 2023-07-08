#!/bin/bash

echo "Loading .env file..."

docker-compose up -d --build
sleep 20
echo "------------------------------------------------------"
echo "Project Generated!"
echo "------------------------------------------------------"

sleep 5
sh wp-init.sh
sleep 20
echo "------------------------------------------------------"
echo "WP CLI initialized..."
echo "----------------------PROJECT READY!-------------------"
