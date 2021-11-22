#### Docker Commands

# Todo 

run `docker -v` - to check docker version

run `docker build -f Dockerfile -t guidelk-docker .` - to generate & build docker image

run `docker images` - check available docker images

run `docker run -p 8085:8085 guidelk-docker` - run docker image in port 8085 and initialize springboot


# Errors encountered

> Open Intellij > Maven Tab > open lifecycle > run clean > run install

**or**

run `mvn clean install` and then follow the steps in **Todo** to initialize **docker**

#### Docker Command Using Docker Compose
docker compose up

