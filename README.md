##UNDER ROOT USER:

###DOCKER-COMPOSE:
docker-compose up -d
docker-compose stop

####To login as root:
docker exec -u root -it project1_webapp_container bash

##FOR DEBUGGING RUN:
node --inspect-brk=0.0.0.0 index.js

---

###PROJECT (old):
cd /**PATH_TO**/.../docker-node/
docker build -t project1_webapp_image -f Dockerfile_webapp .
docker run -it -w /project1 --user usernew --name project1_webapp_container -p 3030:3000 -p 9229:9229 -v /project1:/project1 project1_webapp_image bash
docker start project1_webapp_container
docker stop project1_webapp_container
docker exec -it project1_webapp_container bash

###DATABASE (old):
cd /**PATH_TO**/.../docker-node/
docker build -t project1_mongodb_image -f Dockerfile_mongodb .
docker run -it --ip 172.17.0.200 --name project1_mongodb_container project1_mongodb_image bash

###XORG (old):

> xhost local:docker

\*- to remove access run

> xhost -local:docker

docker build -t xorg_image -f Dockerfile_xorg .

docker run -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix --user="$(id --user):$(id --group)" --name xorg_container xorg_image

docker exec -it xorg_container bash

###LINUX TIP

Check you have enough watchers - https://webpack.js.org/configuration/watch/#not-enough-watchers.
