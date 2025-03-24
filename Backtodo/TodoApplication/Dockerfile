# Use official Maven image to build the application

FROM maven:3.8.8-eclipse-temurin-17 AS build


# Set working directory

WORKDIR /app


# Copy pom.xml and download dependencies (to leverage Docker cache)

COPY pom.xml .

RUN mvn dependency:go-offline


# Copy the source code and build the application

COPY src ./src

RUN mvn clean package -DskipTests


# Use a lightweight JDK image for runtime

FROM openjdk:17-jdk-slim


# Set working directory

WORKDIR /app


# Copy the JAR file from the build stage

COPY --from=build /app/target/TodoApplication-0.0.1-SNAPSHOT.jar .


# Expose the application port

EXPOSE 8080


# Run the application

ENTRYPOINT ["java", "-jar", "TodoApplication-0.0.1-SNAPSHOT.jar"]


