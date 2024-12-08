# Build the Docker image
```bash
docker build -t nestjs-app .
```

# Run the Docker container
```bash
docker run -p 3000:3000 nestjs-app
```

# To open the Swagger UI and access the APIs, paste this in your browser
```
http://localhost:3000/api-docs
```