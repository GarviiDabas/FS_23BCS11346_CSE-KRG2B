# Stage 1: Build the application
# Use a full Java JDK image to build the .jar file
FROM eclipse-temurin:17-jdk-alpine as builder

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and POM file
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies (this layer is cached)
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the application and skip tests
RUN ./mvnw package -DskipTests

# ---
# Stage 2: Create the final, small image
# Use a lightweight JRE-only image to run the app
FROM eclipse-temurin:17-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the built .jar file from the 'builder' stage
# This copies target/virtual-queue-system-0.0.1-SNAPSHOT.jar to app.jar
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# The command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]