#!/bin/bash

cd ../docker-compose

docker stop jenkins

docker rm jenkins

docker volume prune -a -f

docker builder prune -a -f

docker image prune -a -f

docker-compose -f docker-compose-jenkins.yml up -d