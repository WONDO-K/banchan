# 사용할 기본 이미지를 지정합니다.
FROM openjdk:17-jdk-slim

# JAR 파일을 컨테이너의 /app 디렉토리로 복사합니다.
COPY build/libs/Banchan-0.0.1-SNAPSHOT.jar /app/Banchan-0.0.1-SNAPSHOT.jar

# 컨테이너에서 애플리케이션을 실행할 포트를 설정합니다.
EXPOSE 8080

# 애플리케이션을 실행합니다.
ENTRYPOINT ["java", "-jar", "/app/Banchan-0.0.1-SNAPSHOT.jar"]