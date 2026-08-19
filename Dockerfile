### DOCKERFILE
# Image
ARG PROJECT_NAME
FROM wordpress:apache

# APT Update/Upgrade, then install packages we need
RUN apt update && \
  apt upgrade -y && \
  apt autoremove && \
  apt install -y \
  vim \
  wget \
  mariadb-client


ARG PROJECT_NAME
ENV PROJECT_NAME=${PROJECT_NAME}

# Copy wordpress source files
COPY ./dist/ ${APACHE_DOCUMENT_ROOT}/var/www/html/wp-content/themes/${PROJECT_NAME}

# WORKDIR ${APACHE_DOCUMENT_ROOT}/var/www/html/wp-content/themes/default
