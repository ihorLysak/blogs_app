### HOW TO RUN PROJECT

1. navigate to server folder
2. create .env file using example.env as an example
3. run 'docker compose up -d' command
4. run 'npm run start'
5. move up one folder
6. navigate to client folder
7. run 'npm run dev'
8. use the url from command line in the browser to open application

### THINGS TO IMPROVE

- post changes are not immediately displayed
- password is not salted in the DB via bcrypt
- user password should not be on client
- application lacks the token re-validation mechanism
