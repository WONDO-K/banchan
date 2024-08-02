FROM jenkins/jenkins:lts

USER root

# Docker 설치
RUN apt-get update && \
    apt-get install -y \
    sudo \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io

# Docker Compose 설치
RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Docker 그룹에 jenkins 사용자 추가
# RUN groupmod -g 999 docker || groupadd -g 999 docker && usermod -aG docker jenkins

RUN echo "jenkins ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# 필요한 플러그인 설치 (선택 사항)
RUN jenkins-plugin-cli --plugins "docker-plugin"

USER jenkins


