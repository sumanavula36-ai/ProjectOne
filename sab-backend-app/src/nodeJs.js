// Basic Node.js interview questions and answers with code examples

// 1. What is Node.js?
// Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript
// on the server side, enabling the creation of scalable and high-performance applications.

// 2. How does Node.js handle asynchronous operations?
// Node.js uses an event-driven, non-blocking I/O model. It utilizes a single-threaded event loop to handle
// multiple concurrent operations without blocking the execution of other code. When an asynchronous operation
// is initiated, Node.js registers a callback function and continues executing other code. Once the operation
// is complete, the callback function is executed with the result.
// Example of asynchronous operation in Node.js
const fs = require("fs");
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// 3. What is the difference between require() and import in Node.js?
// require() is the CommonJS module system used in Node.js, while import is the ES6 module system.
// require() is synchronous and can be used anywhere in the code, while import is asynchronous and must be
// used at the top level of a module. Additionally, require() can be used to load JSON files and native
// modules, while import is primarily used for JavaScript modules.
// Example of using require() and import
// Using require()
const express = require("express");
const apps = express();
// Using import (ES6 modules)
import express from "express";
const appss = express();

// 4. How do you handle errors in Node.js?
// In Node.js, errors can be handled using try-catch blocks for synchronous code and error-first callbacks
// or Promises for asynchronous code. Additionally, you can use middleware in frameworks like Express to
// handle errors globally.
// Example of error handling in Node.js
// Using try-catch for synchronous code
try {
  const result = someSynchronousFunction();
  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
}
// Using error-first callbacks for asynchronous code
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }
  console.log(data);
});
// Using Promises for asynchronous code
const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    }),
  );
};
readFileAsync("example.txt")
  .then((data) => console.log(data))
  .catch((err) => console.error("Error reading file:", err.message));

// 5. What are streams in Node.js?
// Streams are a way to handle reading and writing data in a continuous manner. They allow you to process
// large amounts of data efficiently by breaking it into smaller chunks, rather than loading the entire
// data into memory at once. There are four types of streams in Node.js: Readable, Writable, Duplex, and Transform.
// Example of using streams in Node.js
const readableStream = fs.createReadStream("largefile.txt", "utf8");
const writableStream = fs.createWriteStream("output.txt");

readableStream.pipe(writableStream);
readableStream.on("end", () => {
  console.log("File copied successfully");
});

// 6. How do you manage packages in Node.js?
// Packages in Node.js are managed using npm (Node Package Manager) or yarn. You can install, update,
// and remove packages using command-line tools. The package.json file is used to keep track of the
// dependencies and metadata of a Node.js project.
// Example of managing packages with npm
// To install a package
// npm install express
// To update a package
// npm update express
// To remove a package
// npm uninstall express
// To create a package.json file
// npm init
// To install all dependencies listed in package.json
// npm install

// 7. What is middleware in Express.js?
// Middleware functions are functions that have access to the request object (req), the response object (res),
// and the next middleware function in the application’s request-response cycle. These functions can execute
// any code, make changes to the request and response objects, end the request-response cycle, or call the next middleware function in the stack.
// Example of using middleware in Express.js
apps.use((req, res, next) => {
  console.log("Middleware executed");
  next(); // Call next() to pass control to the next middleware function
});

// 8. How do you connect to a database in Node.js?
// You can connect to a database in Node.js using various database drivers or Object-Relational Mapping (ORM)
// libraries. For example, you can use the 'mongodb' package to connect to a MongoDB database or 'sequelize'
// to connect to SQL databases.
// Example of connecting to a MongoDB database using the 'mongodb' package
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err.message);
    return;
  }
  const db = client.db("mydatabase");
  console.log("Connected to MongoDB");
  client.close();
});

// Example of connecting to a SQL database using Sequelize
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql", // or 'postgres', 'sqlite', etc.
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// 9. What is the event loop in Node.js?
// The event loop is a core concept in Node.js that allows it to perform non-blocking I/O operations.
// It continuously checks the call stack and the callback queue, executing callbacks when the call stack is empty.
// This enables Node.js to handle multiple operations concurrently without blocking the execution of other code.
// Example to illustrate the event loop
console.log("Start");
setTimeout(() => {
  console.log("Timeout callback executed");
}, 0);
console.log("End");
// Output:
// Start
// End
// Timeout callback executed
// In this example, even though the timeout is set to 0 milliseconds, the callback is executed after the
// synchronous code because of the event loop mechanism.

// 10. How do you create a simple HTTP server in Node.js?
const http = require("http");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
// This code creates a simple HTTP server that listens on port 3000 and responds with "Hello, World!"
// to any incoming requests.

// End of Node.js interview questions and answers with code examples

//Mid level questions can include topics like clustering, worker threads, buffers, and performance optimization.
// Advanced topics can cover areas such as building microservices, using GraphQL with Node.js,
// implementing authentication and authorization, and deploying Node.js applications in production environments.

//Provide mid level questions and answers withe code examples if needed.
// Mid-Level Node.js Interview Questions and Answers with Code Examples

// 1. What are Worker Threads in Node.js and when would you use them?
// Worker Threads are a way to run JavaScript code in parallel on multiple threads. They are useful for
// CPU-intensive tasks that can block the event loop, such as complex calculations or data processing.
// By offloading these tasks to worker threads, you can keep the main thread responsive.
// Example of using Worker Threads in Node.js
const { Worker, isMainThread, parentPort } = require("worker_threads");
if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (result) => {
    console.log("Result from worker:", result);
  });
} else {
  // Perform a CPU-intensive task
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  parentPort.postMessage(sum);
}

// 2. How does Node.js handle clustering and what are its benefits?
// Clustering in Node.js allows you to create multiple instances of your application that can run on
// different CPU cores. This helps to improve the performance and scalability of your application by
// utilizing multiple CPU cores effectively.
// Example of using clustering in Node.js
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello from worker " + process.pid);
    })
    .listen(8000);
}
// In this example, the master process forks multiple worker processes equal to the number of CPU cores.
// Each worker runs an HTTP server that responds with its process ID.

// 3. What are Buffers in Node.js and how do you use them?
// Buffers are a way to handle binary data in Node.js. They are used to store raw data and can be manipulated using various methods.
// Buffers are particularly useful when working with streams, file I/O, or network communication.
// Example of using Buffers in Node.js
const buffer = Buffer.from("Hello, World!");
console.log(buffer.toString()); // Output: Hello, World!
buffer.write("Hi", 0); // Overwrite the first two bytes
console.log(buffer.toString()); // Output: Hi, World!

// 4. How do you optimize the performance of a Node.js application?
// Performance optimization in Node.js can be achieved through various techniques such as:
// - Using asynchronous programming to avoid blocking the event loop.
// - Implementing caching strategies to reduce database calls.
// - Utilizing clustering to take advantage of multiple CPU cores.
// - Minimizing the use of synchronous code and blocking operations.
// - Profiling and monitoring the application to identify bottlenecks.
// Example of using caching to optimize performance
const cache = {};
function getData(key) {
  if (cache[key]) {
    return Promise.resolve(cache[key]);
  }
  return fetchDataFromDatabase(key).then((data) => {
    cache[key] = data; // Store the result in cache
    return data;
  });
}

// 5. How do you implement authentication and authorization in a Node.js application?
// Authentication and authorization can be implemented in a Node.js application using various strategies such as
// JWT (JSON Web Tokens), OAuth, or session-based authentication. Libraries like Passport.js can help simplify
// the implementation of these strategies.
// Example of implementing JWT authentication in Node.js
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "1h",
  });
}
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 6. How do you deploy a Node.js application in a production environment?
// Deploying a Node.js application in a production environment can be done using various methods such as
// using a process manager like PM2, deploying on cloud platforms like AWS, Heroku, or using containerization
// with Docker. It is important to ensure that the application is properly configured for production, including
// setting environment variables, handling errors gracefully, and optimizing performance.
// Example of deploying a Node.js application using PM2
// Install PM2 globally
// npm install -g pm2
// Start the application with PM2
// pm2 start app.js --name "my-app"
// To view logs
// pm2 logs my-app
// To restart the application
// pm2 restart my-app

// End of mid-level Node.js interview questions and answers with code examples

// Advanced Node.js Interview Questions and Answers with Code Examples

// 1. How do you build microservices with Node.js?
// Building microservices with Node.js involves creating small, independent services that communicate with each other
// through APIs. You can use frameworks like Express.js or Fastify to create RESTful APIs for each microservice.
// Additionally, you can use tools like Docker and Kubernetes for containerization and orchestration of microservices.
// Example of a simple microservice using Express.js
const express = require("express");
const app = express();
app.get("/service1", (req, res) => {
  res.json({ message: "Hello from Service 1" });
});
app.listen(3001, () => {
  console.log("Service 1 running on port 3001");
});
// In this example, we have a simple microservice that listens on port 3001 and responds with a message when the /service1 endpoint is accessed.

// 2. How do you use GraphQL with Node.js?
// GraphQL is a query language for APIs that allows clients to request only the data they need. You can use libraries like Apollo Server or Express-GraphQL to implement GraphQL in a Node.js application.
// Example of using GraphQL with Apollo Server
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
  },
};
const servers = new ApolloServer({ typeDefs, resolvers });
servers.listen().then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});
// In this example, we define a simple GraphQL schema with a single query that returns a string. The Apollo Server is then started to listen for incoming GraphQL requests.

// 3. How do you implement authentication and authorization in a Node.js application using Passport.js?
// Passport.js is a popular authentication middleware for Node.js that provides various strategies for authentication.
// You can use it to implement authentication and authorization in your application.
// Example of using Passport.js for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    // Replace with your user authentication logic
    if (username === "admin" && password === "password") {
      return done(null, { id: 1, username: "admin" });
    } else {
      return done(null, false, { message: "Incorrect credentials" });
    }
  }),
  passport.serializeUser((user, done) => {
    done(null, user.id);
  }),
);
passport.deserializeUser((id, done) => {
  // Replace with your user retrieval logic
  const user = { id: 1, username: "admin" };
  done(null, user);
});
// In this example, we set up a local authentication strategy using Passport.js. The strategy checks the provided username and password against
// hardcoded values and returns a user object if the credentials are correct. The serializeUser and deserializeUser functions are used to manage
// user sessions.

// 4. How do you deploy a Node.js application in a production environment using Docker?
// Deploying a Node.js application using Docker involves creating a Dockerfile that defines the environment and dependencies for your
// application, building a Docker image, and then running a container from that image.
// Example of a Dockerfile for a Node.js application
/*
# Use an official Node.js runtime as a parent image
FROM node:14
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Expose the port the app runs on 
EXPOSE 3000
# Define the command to run the application
CMD ["node", "index.js"]
*/
// To build the Docker image
// docker build -t my-node-app .
// To run the Docker container
// docker run -p 3000:3000 my-node-app
// In this example, we create a Dockerfile that sets up a Node.js environment, installs dependencies, and runs the application.
// We then build the Docker image and run it as a container, exposing the application on port 3000.

// End of advanced Node.js interview questions and answers with code examples

// Note: The code snippets provided in the answers are for illustrative purposes and may require additional context or modifications to
// work in a real application.

// The above questions and answers cover a range of topics from basic to advanced levels in Node.js, providing a comprehensive
// overview for interview preparation.

// The code snippets provided in the answers are for illustrative purposes and may require additional context or modifications to work in
// a real application.
