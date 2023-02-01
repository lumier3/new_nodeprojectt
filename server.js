const fs = require("fs");
const http = require("http");
const date = new Date();
const users = [
  {
    id: 1,
    userName: "Denji",
    email: "denji001@gmail.com",
    password: "makimaa009",
    createdAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    updatedAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  },
  {
    id: 2,
    userName: "Power",
    email: "meowwwy@gmail.com",
    password: "denjiiibakkka",
    createdAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    updatedAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  },
  {
    id: 3,
    userName: "Makima",
    email: "makiima1@yahooo.com",
    password: "wannnaControlAllheh",
    createdAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    updatedAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  },
];

const server = http.createServer((req, res) => {
  const root = req.url === "/";
  if (root) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.parse("hello"));
    return res.end();
  } else if (req.url === "/users") {
    const method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      return res.end();
    } else if (method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const newUser = JSON.parse(data);
        console.log(data);
        console.log(newUser);
        users.push(newUser);

        res.writeHead(200, { "Context-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "PUT") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const newData = JSON.parse(data);
        const foundUser = users.find((user) => user.id === newData.id);
        const newName = newData.userName;
        if (foundUser) {
          foundUser.userName = newName;
          foundUser.updatedAt = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
        }
        res.writeHead(200, { "Context-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "DELETE") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const dataFromClinet = JSON.parse(data);
        console.log(data);
        const foundUser = users.find((user) => user.id === dataFromClinet.id);
        console.log(foundUser);
        if (foundUser) {
          const indexoFfounderUser = users.indexOf(foundUser);
          if (indexoFfounderUser > -1) {
            users.splice(indexoFfounderUser, 1);
          }
        }
        res.writeHead(200, { "Context-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    }
  } else if (req.url === "/fileUpload") {
    const writeStream = fs.createWriteStream("test.jpg");
    req.pipe(writeStream);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "hii there" }));
    res.end();
  } else {
    res.writeHead(500);
    res.write("<h1>unknown path</h1>");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});
