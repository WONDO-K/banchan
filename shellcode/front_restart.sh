#!/bin/bash

cd ../docker-compose

docker stop banchan_front

docker rm banchan_front

docker volume prune -a -f

docker builder prune -a -f

docker image prune -a -f

docker-compose -f docker-compose-front.yml up -d