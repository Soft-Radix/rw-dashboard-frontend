FROM nginx

# Remove the default NGINX index.html file
RUN rm /usr/share/nginx/html/index.html


# Copy the built app from the previous stage
COPY  ./build /usr/share/nginx/html

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Copy custom NGINX config
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Set the entrypoint script to be executed
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
