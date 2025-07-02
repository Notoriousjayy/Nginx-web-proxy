user  www-data;
worker_processes  auto;

events { worker_connections 1024; }

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  sendfile       on;
  keepalive_timeout 65;

  ##
  ##  Single-Page-App server block
  ##
  server {
    listen 80 default_server;
    server_name _;                 # any host

    root  /var/www/html;
    index index.html;

    # Support client-side routing (React-Router, etc.)
    location / {
      try_files $uri $uri/ /index.html;
    }

    # Reduce 403 risk on directories
    autoindex off;
  }
}
