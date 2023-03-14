const mongoos=require("mongoose");
const Schema=mongoos.Schema;
const ExamDetale=require("./examDetail");
const Curreculem =require("./curreculem");
const studentSchema =Schema({
    studentName:{type:String,required:true,unique:true},
    studentEmail:{type:String,required:true},
    password:{type:String,required:true},
    examDetales:[{type:Schema.Types.ObjectId,ref:'ExamDetale'}],
    curreculems:[{type:Schema.Types.ObjectId,ref:'Curreculem'}]
})

module.exports=mongoos.model('Student',studentSchema);