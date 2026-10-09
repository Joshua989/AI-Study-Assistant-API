## 1. THE PROJECT

We are going to build an **AI Study Assistant API**, a backend system that allows students to send questions and receive AI-generated explanations. The student will send a question to our backend, our backend will receive and validate the question, then communicate with an AI API to generate an answer. Once the AI responds, our backend will process the response and send the answer back to the student. This project will help us understand how a backend can communicate with an external AI service while applying the JavaScript, Node.js, Express, APIs, HTTP requests, `async/await`, JSON, and error handling concepts we have already learned.


## Problem Statement

Many students struggle to understand certain topics when studying, especially when they are learning on their own or do not have immediate access to a teacher. When students get confused, they may spend a lot of time searching for explanations from different sources, and the information they find may be too complex, unclear, or difficult to relate to their level of understanding. This can make learning frustrating and slow. The AI Study Assistant is designed to solve this problem by giving students a simple way to ask questions and receive clear, understandable explanations whenever they need help.2t 




System design is the process of planning how a system will work before we build it.
It answers questions like:
- What parts will the system have?
- How will those parts communicate?
- What happens when a user performs an action?
- Where does information come from?
- How does information move through the system?
- What happens when something goes wrong?
Think of it like the blueprint of a building. Before constructing a house, you decide where the rooms, doors, electricity, and plumbing will go. System design does the same thing for a software product.
For our AI Study Assistant, system design helps us plan what happens when a student asks a question.
For example
Student asks a question
↓
AI Study Assistant receives the question
↓
The system checks the question
↓
The question is sent to the AI service
↓
The AI generates an explanation
↓
The explanation comes back to our system
↓
The student receives the answer
So, before writing the code, we use system design to understand how all these parts work together.
The PRD tells us what we are building and why.
The system design tells us how the system will work.
The code is what we use to actually build it.
For this project, system design is the bridge between our PRD/problem statement and the actual Node.js implementation.



6
# Technologies & Concepts Required for the AI Study Assistant

## 1. Node.js

### Definition
*Node.js* is a runtime that allows us to run JavaScript outside the browser, especially for building backend applications.

### In our project
We will use Node.js to create the backend of our AI Study Assistant.

Instead of JavaScript running inside Chrome:

```text
Browser
   ↓
JavaScript
```

we will have:

```text
Computer/Server
      ↓
   Node.js
      ↓
Our Backend
```

### Simple syntax

```js
console.log("Hello from the backend");
```

When we run:

```bash
node server.js
```

Node.js executes our JavaScript file.

---

# 2. npm

### Definition
*npm* stands for Node Package Manager. It allows us to install and manage packages that our Node.js project needs.

For example, instead of creating everything ourselves, we can install Express and Groq's SDK.

### Types of npm dependencies

There are two important categories:

**Dependencies**

Packages required for the application to run.

Example:

```bash
npm install express
```

**Development dependencies**

Packages mainly used while developing the application.

Example:

```bash
npm install nodemon --save-dev
```

### In our project

We will need packages such as:

```bash
npm install express groq-sdk dotenv
```

---

# 3. Express.js

### Definition
*Express.js* is a Node.js framework used to build web servers and APIs more easily.

Without Express, we would have to manually handle many details of incoming requests.

With Express, we can easily create routes such as:

```text
POST /ask
```

### Simple syntax

```js
const express = require("express");

const app = express();
```

Then we can create a route:

```js
app.get("/", (req, res) => {
  res.send("Hello");
});
```

### Types of HTTP routes we will use

| Method | Purpose |
|---|---|
| GET | Get information |
| POST | Send/create information |
| PATCH | Update information |
| DELETE | Delete information |

For our project, the most important one will be:

```text
POST
```

because the student will **send a question** to the backend.

Example:

```js
app.post("/ask", (req, res) => {
  // handle question
});
```

---

# 4. API

### Definition
An *API* is a way for different software systems to communicate with each other.

Think of an API as a **messenger** between two systems.

For our project:

```text
Student
   ↓
Our Backend
   ↓
Groq API
   ↓
AI Model
```

Our backend communicates with Groq through an API.

### Simple API example

```js
const response = await fetch("https://example.com/api");
```

We are basically saying:

> "Hey, API. Give me this information."

---

# 5. Groq API

### Definition
The *Groq API* allows our application to communicate with AI models hosted by Groq so that our application can send a question and receive an AI-generated response.

Groq provides a JavaScript/Node.js SDK called `groq-sdk`, and its API supports chat-completion requests containing messages and a model. [GroqCloud](https://console.groq.com/docs/api-reference?utm_source=chatgpt.com)

### In our project

The student asks:

```text
What is JavaScript?
```

Our backend sends that question to Groq.

Groq processes it using an AI model and returns an answer.

```text
Question
   ↓
Our Backend
   ↓
Groq API
   ↓
AI Model
   ↓
Answer
   ↓
Our Backend
   ↓
Student
```

### Basic Groq syntax

The current Groq JavaScript SDK uses:

```js
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
```

Then:

```js
const response = await groq.chat.completions.create({
  model: "openai/gpt-oss-20b",
  messages: [
    {
      role: "user",
      content: "Explain JavaScript"
    }
  ]
});
```

The answer can then be accessed from the response:

```js
response.choices[0].message.content
```

Groq's current documentation shows this Chat Completions pattern and also lists current model identifiers; the exact model should be selected from the models available when we build the project. [GroqCloud](https://console.groq.com/docs/api-reference?utm_source=chatgpt.com)

---

# 6. API Key

### Definition
An *API key* is a secret credential that identifies and authorizes our application when communicating with an API.

Think of it like a **password for our application**.

For Groq:

```text
Our Backend
     ↓
GROQ_API_KEY
     ↓
Groq API
```

### Important rule

We should **never** put the API key directly in our JavaScript code or expose it to users.

Bad:

```js
const apiKey = "my-secret-key";
```

Better:

```js
const apiKey = process.env.GROQ_API_KEY;
```

Groq's documentation recommends keeping the API key in an environment variable rather than placing it directly in the codebase. [GroqCloud](https://console.groq.com/docs/quickstart?source=post_page-----5b132bd1f9f3--------------------------------\&utm_source=chatgpt.com)

---

# 7. Environment Variables

### Definition
*Environment variables* are values stored outside our main source code that our application can access when it runs.

They are useful for things such as:

- API keys
- Passwords
- Database URLs
- Secret configuration

### Example

`.env`

```env
GROQ_API_KEY=your_secret_key
```

Then JavaScript can access it with:

```js
process.env.GROQ_API_KEY
```

---

# 8. dotenv

### Definition
*dotenv* is a package that loads values from a `.env` file into the application's environment.

Install it:

```bash
npm install dotenv
```

Use it:

```js
require("dotenv").config();
```

Then:

```js
console.log(process.env.GROQ_API_KEY);
```

So the relationship is:

```text
.env
 ↓
dotenv
 ↓
process.env
 ↓
GROQ_API_KEY
 ↓
Groq
```

---

# 9. HTTP

### Definition
*HTTP* is a communication protocol that allows clients and servers to communicate over a network.

For our project:

```text
Student/Client
      ↓ HTTP Request
Backend
      ↓ HTTP Request
Groq API
      ↓ HTTP Response
Backend
      ↓ HTTP Response
Student
```

### HTTP Request

A request is what we send.

### HTTP Response

A response is what we receive.

---

# 10. Request and Response

These two concepts are extremely important for the students.

### Request

The *request* contains information coming **into our backend**.

Example:

```js
req.body
```

If the student sends:

```json
{
  "question": "What is JavaScript?"
}
```

we can get the question using:

```js
const { question } = req.body;
```

### Response

The *response* is what our backend sends back.

Example:

```js
res.json({
  answer: "JavaScript is a programming language."
});
```

So:

```text
Request  →  Backend
Response ←  Backend
```

---

# 11. JSON

### Definition
*JSON* stands for JavaScript Object Notation. It is a common format used to exchange data between applications.

Example:

```json
{
  "question": "What is Node.js?"
}
```

Our backend could return:

```json
{
  "question": "What is Node.js?",
  "answer": "Node.js allows JavaScript to run outside the browser."
}
```

### JavaScript object vs JSON

JavaScript:

```js
const student = {
  name: "Joshua"
};
```

JSON:

```json
{
  "name": "Joshua"
}
```

For our API, JSON will be the main format for sending and receiving data.

---

# 12. Middleware

### Definition
*Middleware* is a function that runs between receiving a request and sending a response.

Think of it as a **checkpoint**.

For example:

```text
Request
   ↓
Middleware
   ↓
Route
   ↓
Response
```

### In our project

We need Express to understand JSON request bodies:

```js
app.use(express.json());
```

This allows us to receive:

```json
{
  "question": "Explain functions"
}
```

and access it through:

```js
req.body
```

---

# 13. Route / Endpoint

### Definition
A *route* or *endpoint* is a specific URL where the backend provides a particular service.

For our project, our main endpoint will be:

```text
POST /ask
```

It means:

> "Send a question to the AI Study Assistant."

### Syntax

```js
app.post("/ask", (req, res) => {
  
});
```

Our project could eventually have:

```text
GET  /
POST /ask
```

But `/ask` is the important endpoint for the first version.

---

# 14. `async` and `await`

### Definition

`async` and `await` allow JavaScript to work with operations that take time to finish, such as communicating with an external API.

When our backend sends a question to Groq, the answer does not appear instantly.

We need to **wait for the AI response**.

### Syntax

```js
async function askAI() {
  const response = await something();
}
```

In our project:

```js
const response = await groq.chat.completions.create({
  // request
});
```

`await` means:

> "Wait for this operation to finish before continuing."

---

# 15. `try...catch`

### Definition
`try...catch` is used to handle errors that may happen while our program is running.

For example, Groq could be temporarily unavailable, the API request could fail, or something could be wrong with our request.

### Syntax

```js
try {
  // code that might fail
} catch (error) {
  // handle the error
}
```

For our project:

```js
try {
  const response = await groq.chat.completions.create({
    // request
  });

} catch (error) {
  console.log(error);
}
```

---

# 16. HTTP Status Codes

### Definition
*Status codes* tell the client what happened with a request.

The main ones we need are:

| Code | Meaning | Our use |
|---|---|---|
| 200 | Success | Question processed successfully |
| 201 | Created | Not essential for our first version |
| 400 | Bad Request | Student didn't provide a question |
| 401 | Unauthorized | Invalid API credentials |
| 404 | Not Found | Route doesn't exist |
| 500 | Server Error | Something went wrong on our backend |

Example:

```js
res.status(400).json({
  message: "Question is required"
});
```

And:

```js
res.status(500).json({
  message: "Something went wrong"
});
```

---

# 17. Destructuring

Students already know JavaScript objects, so we will reuse that knowledge here.

### Definition
*Destructuring* allows us to take values directly from an object.

Instead of:

```js
const question = req.body.question;
```

we can write:

```js
const { question } = req.body;
```

This will be used heavily in our backend.

---

# 18. The `process` Object

### Definition
`process` is a Node.js object that provides information about the environment in which our application is running.

For our project, we mainly need:

```js
process.env
```

It allows us to access environment variables.

Example:

```js
process.env.GROQ_API_KEY
```

This means:

> "Give me the value of `GROQ_API_KEY` from the environment."

---

# 19. Groq Messages and Roles

Because we are using Groq's chat-completion API, students also need to understand *messages* and *roles*.

A basic request looks like:

```js
messages: [
  {
    role: "user",
    content: "Explain JavaScript"
  }
]
```

There are three important roles:

### `user`

Represents what the student says.

```js
{
  role: "user",
  content: "What is Node.js?"
}
```

### `system`

Provides instructions about how the AI should behave.

```js
{
  role: "system",
  content: "You are a helpful study assistant."
}
```

### `assistant`

Represents an AI response in a conversation.

```js
{
  role: "assistant",
  content: "Node.js is..."
}
```

Groq's documentation describes chat requests as a series of messages using roles such as `system`, `user`, and `assistant`. [GroqCloud](https://console.groq.com/docs/text-chat?utm_source=chatgpt.com)

---

# 20. The Complete Concept Map

By the time we start coding, students should understand this:

```text
                    AI STUDY ASSISTANT
                           │
                           ▼
                      Node.js
                           │
                           ▼
                       Express
                           │
                           ▼
                    POST /ask
                           │
                           ▼
                  Request + JSON
                           │
                           ▼
                    Validate Input
                           │
                           ▼
                    async / await
                           │
                           ▼
                       Groq API
                           │
                           ▼
                     AI Model
                           │
                           ▼
                      AI Response
                           │
                           ▼
                   Process Response
                           │
                           ▼
                    JSON Response
                           │
                           ▼
                       Student
```

### The exact tools/concepts they need before coding

| Category | What they need to understand |
|---|---|
| Runtime | Node.js |
| Package manager | npm |
| Backend framework | Express.js |
| Communication | HTTP |
| Data format | JSON |
| Backend communication | API |
| AI service | Groq API |
| Authentication | API key |
| Secret management | `.env` + dotenv |
| API structure | Routes/endpoints |
| HTTP data | Request & response |
| Express feature | Middleware |
| Asynchronous JavaScript | `async` / `await` |
| Error handling | `try` / `catch` |
| API results | Status codes |
| Groq AI requests | Messages & roles |
| JavaScript | Destructuring |
| Node.js | `process.env` |

This is the **right amount of theory before the project**. We don't need to teach databases, authentication systems, frontend frameworks, Docker, deployment, or advanced AI concepts yet. Those would distract from the core project.

The Groq-specific pieces above are based on Groq's current documentation, including the JavaScript SDK, API-key setup, chat-completion structure, and current API examples. [GroqCloud](https://console.groq.com/docs/api-reference?utm_source=chatgpt.com)


