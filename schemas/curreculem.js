const mongoos=require("mongoose");
const Schema=mongoos.Schema;
const Question=require("./question");
const ExamDetail=require("./examDetail");
const Student=require("./student");
const curreculemSchema=Schema({
    curreculemName:{type:String,required:true},
    category:{type:String,required:true},
    image:{type: String, contentType: String,required:true },
    questions:[{type:Schema.Types.ObjectId,ref:'Question'}],
    students:[{type:Schema.Types.ObjectId,ref:'Student'}],
    examDetails:[{type:Schema.Types.ObjectId,ref:'ExamDetail'}]

});

module.exports=mongoos.model('Curreculem',curreculemSchema);