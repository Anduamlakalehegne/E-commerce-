const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
// createConnection
const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "ecommerce",
});

// ----------------------------- manager ------------------------------

app.get("/api/select", (req, res) => {
  const sqlSelect = "SELECT * FROM ecommerce.products;";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});

app.post("/api/insert", (req, res) => {
  const item = req.body.projectName;
  const size = req.body.projectId;
  const quantity = req.body.startDate;
  const price = req.body.endDate;
  const status = req.body.description;

  const sqlInsert = "INSERT INTO ecommerce.cart (item, size, quantity, price, status) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [item, size, quantity, price, status], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

// ----------------------------- employee ------------------------------

app.get("/api/employee", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.users WHERE role = 'user' ";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});

app.get("/api/employee/assign", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.users WHERE role = 'user' ";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});


app.post("/api/addtocart", (req, res) => {
  const id = req.body.id;
  const item = req.body.item;
  const quantity = req.body.count;
  const price = req.body.price;
  const userid = req.body.userId;
  console.log(id)
  console.log(item)
  console.log(quantity)
  console.log(price)
  console.log(userid)

  const sqlInsert = "INSERT INTO ecommerce.cart (id, item, quantity, price, userid) VALUES (?,?,?,?,?)";

  db.query(sqlInsert, [id, item, quantity, price, userid], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

// ----------------------------- employee ------------------------------

app.get("/api/actionplan", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.actionplan;"
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
});

app.get("/api/actionplan/detail/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query("SELECT * FROM ecommerce.cart where userid = ?", id, (err, result) => {
    res.send(result)
  })
});

app.get("/api/product/detail/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query("SELECT * FROM ecommerce.products where id = ?", id, (err, result) => {
    res.send(result)
  })
});

app.post("/api/actionplan", (req, res) => {
  const projectStartDate = req.body.projectStartDate;
  const projectEndDate = req.body.projectEndDate;
  const documentationStartDate = req.body.documentationStartDate;
  const documentationEndDate = req.body.documentationEndDate;
  const databasStartDate = req.body.databasStartDate;
  const databasEndDate = req.body.databasEndDate;
  const codeStartDate = req.body.codeStartDate;
  const codeEndDate = req.body.codeEndDate;
  const testStartDate = req.body.testStartDate;
  const testEndDate = req.body.testEndDate;
  const deployStartDate = req.body.deployStartDate;
  const deployEndDate = req.body.deployEndDate;
  const projectId = req.body.projectId;
  const employeeId = req.body.employeeId;
  // console.log(projectStartDate)
  // console.log(projectEndDate)
  // console.log(projectId)
  // console.log(employeeId)
  const sqlInsert = "INSERT INTO actionplan (projectStartDate, projectEndDate, documentationStartDate, documentationEndDate, databasStartDate, databasEndDate, codeStartDate, codeEndDate, testStartDate, testEndDate, deployStartDate, deployEndDate, projectId, employeeId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [projectStartDate, projectEndDate, documentationStartDate, documentationEndDate, databasStartDate, databasEndDate, codeStartDate, codeEndDate, testStartDate, testEndDate, deployStartDate, deployEndDate, projectId, employeeId], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

// ----------------------------- Login ------------------------------
app.post("/api/employee/login", (req, res) => {
  const employeeEmail = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM ecommerce.users WHERE email = ? AND password = ?";
  db.query(sqlSelect, [employeeEmail, password], (err, result) => {
    if (result.length > 0) {
      res.send(result);
    }
    else {
      res.send({ error: "User Does Not Exit" })
    }
  })
});

// ----------------------------- manager ------------------------------

app.get("/api/employee/project/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  db.query("SELECT * FROM cruddatabase.projects where employeId = ?", id, (err, result) => {
    res.send(result)
  })
});


app.put("/update", (req, res) => {
  const projectId = req.body.projectTd;
  const employeId = req.body.employid;
  db.query(
    "UPDATE projects SET employeId = ? WHERE projectId = ?",
    [employeId, projectId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.put("/update/user", (req, res) => {
  const employeeId = req.body.employid;
  console.log(employeeId)
  db.query(
    "UPDATE users SET project = 'Assigned' WHERE employeeId = ?",
    [employeeId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.put("/actionplan/update", (req, res) => {
  const projectId = req.body.projectId;
  const approval = req.body.approval;
  // console.log(id)
  // console.log(employid)
  // console.log(approval)
  db.query(
    "UPDATE actionplan SET approval = ? WHERE projectId = ?",
    [approval, projectId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// ---------- Delete User -----------
app.delete("/api/cart/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM ecommerce.cart where userid = ?", id, (err, result) => {
    res.send(result)
  })
});


// ---------- Delete User -----------
app.delete("/api/singleCart/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM ecommerce.cart where id = ?", id, (err, result) => {
    res.send(result)
  })
});


// ---------- Detail User -----------
app.get("/api/employee/detail/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  db.query("SELECT * FROM cruddatabase.users where id = ?", id, (err, result) => {
    res.send(result)
  })
});


// ---------- Delete Project -----------
app.delete("/api/project/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  db.query("DELETE FROM cruddatabase.projects where id = ?", id, (err, result) => {
    res.send(result)
  })
});


// ----------------------------- manager ------------------------------
app.put("/employee/update", (req, res) => {
  const id = req.body.projectTd;
  const employeeName = req.body.employeeName;
  const employeeId = req.body.employeeId;
  const employeeEmail = req.body.employeeEmail;
  const password = req.body.password;
  const Position = req.body.Position;
  db.query(
    "UPDATE projects SET employeeName = ? , employeeId = ? , employeeEmail = ? , password = ? , Position = ?  ,  WHERE id = ?",
    [employeeName, employeeId, employeeEmail, password, Position, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});



app.post("/api/projectProgress/default", (req, res) => {

  const projectId = req.body.projectId;
  // console.log(projectId + "xxx")

  const sqlInsert = `INSERT INTO cruddatabase.projectprogress ( project, documentation, databas, code, test, deploy, projectId) VALUES ('Not Started','Not Started','Not Started','Not Started','Not Started','Not Started','${projectId}')`;
  db.query(sqlInsert, [projectId], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

// "UPDATE actionplan SET approval = ? WHERE projectId = ?",
app.put("/api/projectProgress", (req, res) => {
  const project = req.body.project;
  const documentation = req.body.documentation;
  const database = req.body.database;
  const code = req.body.code;
  const test = req.body.test;
  const deploy = req.body.deploy;
  const projectId = req.body.projectId;

  // console.log(project)
  // console.log(documentation)

  const sqlInsert = "UPDATE cruddatabase.projectprogress SET project = ? , documentation = ? , databas = ? , code = ? , test = ? , deploy = ? WHERE projectId = ? ";
  db.query(sqlInsert, [project, documentation, database, code, test, deploy, projectId], (err, result) => {
    if (result) {
      res.send(result)
    }
    else {
      res.send({ message: "Faield to add" })
    }
  })
});

app.get("/api/projectProgress/detail/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  db.query("SELECT * FROM cruddatabase.projectprogress where projectId = ?", id, (err, result) => {
    res.send(result)
  })
});






app.listen(3007, () => {
  console.log("The server is running on port 3007");
});
