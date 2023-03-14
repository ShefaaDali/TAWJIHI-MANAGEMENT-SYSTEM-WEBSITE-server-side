const mongoos=require("mongoose");
const Schema=mongoos.Schema;
const Student=require("./student");
const Curreculem=require("./curreculem");
const examDetaleSchema=Schema({
    dateAndTime:{type:Date,required:true},
    grade:{type:Number,required:true},
    period:{type:Number,required:true},
    student:{type:Schema.Types.ObjectId,ref:'Student'},
    curreculem:{type:Schema.Types.ObjectId,ref:'Curreculem'},
    curreculemName:{type:String,required:true},
    numberOfRigthAnswer:{type:Number,required:true},
    numberOfWrongAnswer:{type:Number,required:true}
})

module.exports=mongoos.model('ExamDetale',examDetaleSchema);