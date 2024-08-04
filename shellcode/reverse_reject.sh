#!/bin/bash

cd ../docker-compose

docker stop reverse

docker rm reverse

docker volume prune -a -f

docker builder prune -a -f

docker image prune -a -f
