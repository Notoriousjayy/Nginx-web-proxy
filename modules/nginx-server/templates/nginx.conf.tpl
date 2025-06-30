user  www-data;
worker_processes  auto;
pid        /run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile            on;
    keepalive_timeout   65;

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;

        root   /var/www/html;
        index  index.html index.htm;

        location / {
            try_files $uri $uri/ =404;
        }
    }
}
