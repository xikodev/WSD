# ABC Questions and Answers

## Question 1

The web server has had an uptime of 45 hours in the past 48 hours. During this period, the following metrics were
measured:

- Average response time
- Throughput
- Availability

Which parameter does this information most directly affect, and why?

## On availability, because an uptime of 45/48 hours implies a server availability of 93.75% during that period.

---

## Question 2

What is the correct cookie setting so that it is valid only within the `/app` path and only on the `example.com` domain?

## `Set-Cookie: sid=abc; Domain=example.com; Path=/app; HttpOnly`

---

## Question 3

Given the following code snippet:

```js
app.use((req, res, next) => {
    console.log('M1');
    next();
});

app.get('/user', (req, res, next) => {
    console.log('Handler /user');
    next();
});

app.use('/', (req, res, next) => {
    res.send('Got use 1');
})

app.use((req, res) => {
    res.send('Got use 2');
});
```

If the client sends `GET /user`, what will be printed to the console and what will be sent to the client?

## Console output

```
M1
Handler /user
```

## Response sent to client: `Got use 1`

---

## Question 4

In `package.json`, the dependency is defined as `"express": "~4.18.2"`.

When you run `npm update`, which version range is allowed to be installed?

## Only version `4.18.x` (e.g., `4.18.5`), but not `4.19.0`.

---

## Question 5

In the HTML document, there is a `<base href="https://www.example.com/assets/">`.

What actual URL will the following HTML element generate within the same document?

```html
<img src="img/logo.png"/>
```

## `https://www.example.com/assets/img/logo.png`

---

## Question 6

The client sends multiple requests using pipelining to optimize page loading.

The order of requests is as follows: `index.html`, `style.css`, `script.js`.

Client requests:

```
GET /index.html HTTP/1.1
Host: www.example.com

GET /style.css HTTP/1.1
Host: www.example.com

GET /script.js HTTP/1.1
Host: www.example.com
```

How will the server respond to these requests?

## It will send the responses in the order the requests were received.

---

## Question 7

What does the `next()` function do in Express.js?

## Continues processing the request with the next middleware or route in the chain.

---

## Question 8

How can you use node express and express-validator to validate data (fields email and password) exclusively from the
body of a POST request and return the appropriate HTTP status code for success or error with error descriptions?

```js
const {body, validationResult} = require('express-validatior');

app.post('/submit', [
    body('email').isEmail(),
    body('password').isLength({min: 5})
], (res, req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.send('Data is valid');
})
```

---

## Question 9

Which of the following `Set-Cookie` fields (HTTP response header) is correctly defined?

## `Set-Cookie: sid=d23423kh435; HttpOnly; SameSite=Lax`

---

## Question 10

The given server architecture has Nginx acting as a reverse proxy in front of a Node.js application server. Nginx
responds to requests directed to `example.com`.

Node.js application:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(3000, () => {
    console.log('Node.js app listening on port 3000');
});
```

## Nginx will serve static files from a local directory (e.g.,

`/var/www/example.com`) and forward dynamic requests to the Node.js appliaction at `http://localhost:3000`

---

## Question 11

If we use two browsers simultaneously on our computer to authenticate access to a website (e.g., logged into Amazon
simultaneously from Chrome and Firefox), which of the following statements about session cookies is correct:

## Each browser will have its own session cookie for accessing that website.

---

## Question 12

Which of the following directives, included within the server's HTTP response, can we use to delete a cookie on the
client side?

Note: The question contains multiple correct answers.

## Set-Cookie: sid=d23423kh435; Max-Age=0

## Set-Cookie: sid=d23423kh435; Expires=Thu, 01 Jan 1970 00:00:00 GMT

---

## Question 13

For the following URL, which statements are correct: `https://edgar.fer.hr/playground/sandbox?q=10#bookmark`?

Note: There are multiple correct answers.

## It contains a fragment.

## The URL is absolute.

---

## Question 14

In the `package.json` file of our project, under `dependencies`, the software library `abcLib` is defined as follows:

```
"abcLib": "~2.3.1"
```

If we run the command `npm update`, which of the following newer versions of the library will be installed (all of them
are available for installation)?

## `2.3.2`

---

## Question 15

Within the HTML page delivered to the client, the following form is present:

```html

<form method="GET">
    <label for="first">First name:</label><br>
    <input type="text" id="first" name="first" required><br>
    <label for="last">Last name:</label><br>
    <input type="text" id="last" name="last" required><br>
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username" value="" placeholder="enter your username" required>
    <input type="hidden" id="sid" value="234a3f0cc7">
    <input type="submit" value="Submit">
</form>
```

```
First name:
Ivan

Last name:
Horvatić

Username:
ivan.horvatic@fer.hr

Submit
```

When the user presses the Submit button, choose which data will be sent to the server and in what format:

## In the header of the HTTP request: `first=Ivan&last=Horvati%E6&username=ivan.horvatic%40fer.hr`

---

## Question 16

Suppose a browser, as part of a previous request for an HTML page from the address
`http://www.fer.unizg.hr/predmet/wim/labosi.html` received the following cookie definition:

```
Set-Cookie: sid=32432; HttpOnly; Domain=fer.unizg.hr; SameSite=Lax
```

In which case will this cookie be sent along with a request for the resource
`http://www2.fer.unizg.hr/predmet/wim/novosti.png`?

## It will be sent if the resource is being loaded as part of a webpage from the corresponding domain (.fer.unizg.hr).
