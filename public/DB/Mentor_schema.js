const mongoose =require('mongoose')

const MentorSchema=new mongoose.Schema({
Mentor_Name:{type:String,required:true},
Students:{type:Array,required:true},
Mentor_mailId:{type:String,required:true},
},{
    timestamps:true,
})

const Mentor=new mongoose.model("Mentor",MentorSchema)
module.exports={Mentor}