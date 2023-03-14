const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./Schemas/user");
const app = express();
const Database = require("./Database");
const db = new Database();

const Student = require("./schemas/student");

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/login", (req, res) => {
  var studentName = req.body.studentName;
  var password = req.body.password;

  Student.findOne(
    { studentName: studentName, password: password },
    function (err, student) {
      if (err) {
        console.log(err);
        return res.status(500).send("!!!");
      }
      if (!student) {
        return res.status(404).send("You Donnot Have Account");
      }
      return res.status(200).send(student);
    }
  );
});

app.post("/userLogin", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne(
    { username: username, password: password },
    function (err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send(user);
      }
      if (!user) {
        return res.status(404).send("You Donnot Have Account");
      }
      return res.status(200).send(user);
    }
  );
});

app.post("/signUp", (req, res) => {
  const body = req.body;
  db.signUp(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/curreculem", (req, res) => {
  db.getAllCurreculem()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/question/:id", (req, res) => {
  const { id } = req.params;
  db.getQuestion(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/ExamDetail/:id", (req, res) => {
  const { id } = req.params;
  db.getExamDetail(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/ExamDetail", (req, res) => {
  db.saveExamDetail(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/SearchInQuestion/:id/:text", (req, res) => {
  const { text } = req.params;
  const { id } = req.params;
  db.SearchInQuestion(id, text)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//
app.get("/question/:id", (req, res) => {
  const { id } = req.params;
  db.getQuestion(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/question", (req, res) => {
  const body = req.body;
  db.postQuestion(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/question/:id", (req, res) => {
  const { id } = req.params;
  db.deleteQuestion(id)
    .then((data) => {
      if (!data) {
        res.send("!data");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/question", (req, res) => {
  const body = req.body;
  db.updateQuestion(body)
    .then((data) => {
      if (!data) {
        res.send("!data");
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/curreculem", (req, res) => {
  const body = req.body;
  db.AddCurreculem(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/curreculem/:id", (req, res) => {
  const { id } = req.params;
  db.DeletCurreculem(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//for save image in db
// var img = fs.readFileSync("./english.jpg");
// var encode_img = img.toString("base64");
// var final_img = {
//   curreculemName: "ENGLISH",
//   category: "Literary",
//   contentType: "jpg",
//   image: encode_img,
// };
// curreculem.create(final_img, function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Saved To database");
//   }
// });

const port = 4000;
db.connect()
  .then((data) => {
    app.listen(port, () =>
      console.log(` server has started on port ${port}....\n ${data}`)
    );
  })
  .catch((err) => console.log(err));
