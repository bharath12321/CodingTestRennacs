# User Management App

This is a React application built with the **Vite** framework, that manages a list of users. It uses axios for making HTTP requests to an API endpoint.

## Code Explanation: App.tsx

1. **useState**: This React hook is used to manage state in functional components. In this case, it's used to manage the list of users (`users`) and the current page number (`page`).

2. **useEffect**: This React hook is used to perform side effects in functional components. Here, it's used to fetch the list of users from the API whenever the `page` state changes.

3. **fetchUsers**: This asynchronous function fetches the list of users from the API. It uses axios to send a GET request to `/api/users?page=${page}`. The response data is then set as the new state for `users`.

4. **createUser**: This asynchronous function creates a new user. It sends a POST request to `/api/users` with the name of the new user. After the user is created, it fetches the updated list of users.

5. **removeUser**: This asynchronous function removes a user. It sends a DELETE request to `/api/users/${userId}`. After the user is removed, it fetches the updated list of users.

6. The `return` statement renders the UI of the application. It includes buttons to create a new user and navigate between pages, and a list of users with a button to remove each user.

## Simple API

This is an Express.js application that provides a REST API for managing users. It uses SQLite for the database.

## Code Explanation: Index.tsx

1. **initDatabase**: This asynchronous function initializes the SQLite database. It opens a connection to `database.db` and creates a `users` table if it doesn't exist.

2. **app.get('/api/users')**: This asynchronous function handles GET requests to `/api/users`. It fetches all users from the `users` table and sends them in the response.

3. **app.post('/api/users')**: This asynchronous function handles POST requests to `/api/users`. It inserts a new user with the provided name into the `users` table and sends the new user's id and name in the response.

4. **app.delete('/api/users/:id')**: This asynchronous function handles DELETE requests to `/api/users/:id`. It deletes the user with the provided id from the `users` table and sends a success message in the response.

5. **app.listen**: This function starts the Express.js server on the specified port and initializes the database.



## Installation and Running

**The following libraries/frameworks are necessary to run the code**:
1. Express
2. Axios
3. SQLite3
4. SQLite

**Can be installed using npm**

## Note About Development Process

**Time Taken To Develop**: Approximately 4.5 hours

## Errors
Although there are no syntax errors, the webpage is blank and is throwing errors in the main.tsx file. However, there seems to be none.
The API successfully runs, but cannot get any users as none could be created due to the blank user management web app. 
