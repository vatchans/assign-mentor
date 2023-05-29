const mongoose =require('mongoose')

const StudentSchema=new mongoose.Schema({
Student_Name:{type:String,required:true},
Mentor_Name:{type:String},
student_mailId:{type:String,required:true},
},{
    timestamps:true,
})

const Students=new mongoose.model("Student",StudentSchema)
module.exports={Students}