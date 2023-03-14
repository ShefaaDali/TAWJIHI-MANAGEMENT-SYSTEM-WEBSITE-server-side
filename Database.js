const mongoose = require("mongoose");
const Question = require("./schemas/question");
const Curreculem = require("./schemas/curreculem");
const Student = require("./schemas/student");
const ExamDetail = require("./schemas/examDetail");
const curreculem = require("./schemas/curreculem");

class Database {
  constructor() {
    this.Url =
      "mongodb://root:root@ac-cqjraev-shard-00-00.zfyycfi.mongodb.net:27017,ac-cqjraev-shard-00-01.zfyycfi.mongodb.net:27017,ac-cqjraev-shard-00-02.zfyycfi.mongodb.net:27017/tawjihi-management-systm?ssl=true&replicaSet=atlas-gmujf2-shard-0&authSource=admin&retryWrites=true&w=majority";
    //"mongodb+srv://root:root@tawjihi-management-syst.zfyycfi.mongodb.net/tawjihi-management-systm?retryWrites=true&w=majority";
    // this.Url='mongodb://localhost:27017/tawjihi';
  }

  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.Url, (err, db) => {
        if (err) reject(err);
        else resolve("Database created!");
      });
    });
  }

  signUp(student) {
    return new Promise((resolve, reject) => {
      let newStudent = new Student(student);
      newStudent
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllCurreculem() {
    return new Promise((resolve, reject) => {
      curreculem
        .find({})
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getQuestion(curId) {
    return new Promise((resolve, reject) => {
      Question.find({ curreculem: curId })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  getExamDetail(studentID) {
    return new Promise((resolve, reject) => {
      ExamDetail.find({ student: studentID })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  saveExamDetail(data) {
    return new Promise((resolve, reject) => {
      let newExamDetail = new ExamDetail(data);

      newExamDetail
        .save()
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }
  SearchInQuestion(id, text) {
    return new Promise((resolve, reject) => {
      const re = new RegExp(text, "i");
      Question.find({ curreculem: id, questionText: re })
        .then((data) => resolve(data))
        .catch((err) => resolve(err));
    });
  }

  updateQuestion(question) {
    return new Promise((resolve, reject) => {
      Question.findByIdAndUpdate(question["_id"], question)
        .then((data) => {
          resolve({ _id: data.id });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteQuestion(id) {
    return new Promise((resolve, reject) => {
      Question.findByIdAndDelete(id)
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  postQuestion(question) {
    return new Promise((resolve, reject) => {
      let newQuestion = new Question(question);
      newQuestion
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  getQuestion(curId) {
    return new Promise((resolve, reject) => {
      Question.find({ curreculem: curId })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  AddCurreculem(data) {
    return new Promise((resolve, reject) => {
      let newCurreculem = Curreculem(data);
      newCurreculem
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  DeletCurreculem(CurId) {
    return new Promise((resolve, reject) => {
      Curreculem.findByIdAndDelete(CurId)
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Database;
