#!/bin/bash

cd ../docker-compose

docker stop banchan_back1
docker stop banchan_back2
docker stop mysql
docker stop redis

docker rm banchan_back1
docker rm banchan_back2

docker volume prune -a -f

docker builder prune -a -f

docker image prune -a -f

docker-compose -f docker-compose-back.yml up -d