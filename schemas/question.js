const mongoos=require("mongoose");
const Schema=mongoos.Schema;
const Curreculem=require("./curreculem");
const questionSchema=Schema({
    questionText:{type:String,required:true},
    options:[{type:String,required:true}],
    correctOpt:{type:String,required:true},
    comment:{type:String},
    curreculem:{type:Schema.Types.ObjectId,ref:'Curreculem' ,required:true}
});

module.exports=mongoos.model('Question',questionSchema);


