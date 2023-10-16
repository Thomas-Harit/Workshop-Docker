FROM mysql:latest

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD=my-secret-pw

# Create a new database
ENV MYSQL_DATABASE=my_database

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the port that MySQL will listen on
EXPOSE 3306
