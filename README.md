# Secret Server API installing

## Prerequisites
- Docker installed
- Need enough space on your drive (approx. 3.7 GB)

## Project setup with docker
- navigate to the folder
   ```
   docker-compose build
   ```
- If the command ran successfully you can reach the website on the http://localhost:8080

### In case any error:
##### Setup 
   - in the root folder:
      ```
      cd server
      npm install
      node start (this command build the client directory to the server/public/)
      ```
#### To run test cases
   ```
   cd server
   npm run test
   ```