# Install mariadb
1. install docker
2. start docker
3. start powershell
4. typping

   * docker pull mariadb
   * docker image is : 도커 이미지 확인
   * docker run --name mariadb -d -p 포트번호:포트번호 -e MYSQL_ROOT_PASSWORD=비밀번호 mariadb
   * docker ps : 설치된 이미지 확인 

## ERROR
   * Conflict. The container name /"mariadb" is already in use by container ...
<pre>
<code>
docker rm mariadb
</code>
</pre>
   * Ports are not available : exposing port TCP 0.0.0.0:3306 -> 0.0.0.0.0: ...
<pre>
<code>
docker run --name mariadb -d -p 포트번호:포트번호 -e MYSQL_ROOT_PASSWORD=비밀번호 mariadb 여기서 다른 포트 번호로 진행
</code>
</pre>

## Start Mariadb
1. docker exec -it mariadb /bin/bash
2. mysql -u root -p : root 계정으로 접속
3. status : mariadb 상태 확인




