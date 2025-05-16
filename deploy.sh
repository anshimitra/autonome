#!/bin/bash

# Define variables
APP_DIR=C:/Projects/autonome/autonome/autonome
NGINX_CONFIG_DIR=/etc/nginx/sites-available
NGINX_CONFIG_FILE=your_nginx_config_file.conf

# Pull latest code from GitHub
cd $APP_DIR
git pull origin master

# Build Angular app
# npm install
# ng build --prod

# Copy built files to Nginx directory
# cp -r dist/* /var/www/html

# Reload Nginx to apply changes
systemctl reload nginx
