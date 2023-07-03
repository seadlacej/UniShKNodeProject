#!/bin/bash

# Stop containers
docker-compose down

docker rm node_app pg_db
docker rmi postgres:12 node_app_image
#docker builder prune --force

# Start containers
docker-compose up -d