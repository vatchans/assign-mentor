var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const { Dburl } = require('../public/DB/Db')
const { Mentor } = require('../public/DB/Mentor_schema')
const {Students} = require('../public/DB/Student_Schema')

mongoose.connect(Dburl);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//1
router.post('/Create_Student', async (req, res) => {
  try {
    let data = await Students.create(req.body)
    res.status(200).send("Student data created successfully")
  }
  catch {
    res.status(500).send("Internal server error")
  }
})
//2
router.post('/Create_mentor', async (req, res) => {
  try {
    let data = await Mentor.create(req.body)
    res.status(200).send("Mentor data created successfully")
  }
  catch {
    res.status(500).send("Internal server error")
  }
})
//3
router.post('/Assign_Students', async (req, res) => {
  try {
    let Student=await Students.find({Mentor_Name:""})
    if(Student.length>0){
      Student.map(async(e)=>{
        let AssignStudents = await Mentor.updateOne({ Mentor_Name: req.body.Mentor }, {
          $push: { Students:e.Student_Name}}
          )
        let UpdateMentor=await Students.updateMany({Student_Name:e.Student_Name},{
          $set:{Mentor_Name:req.body.Mentor}
        })
    })
    res.status(200).send("Mentor Assigned SuccessFully")
  }
  else{
    res.status(400).send("All Students Have mentors")
  }
  }
  catch {
    res.status(500).send("Internal server error")
  }
})
//4
router.put("/Change_mentor",async(req,res)=>{
  try{
    let{Student,Mentor}=req.body
    let Change_mentor=await Students.updateOne({
      Student_Name:Student
    },{$set:{Mentor_Name:Mentor}})
    res.status(200).send("Mentor Changed Successfully")
  }
  catch{
    res.status(500).send("Internal server error")
  }
})
//5
router.get("/Get_Students/:Mentor",async(req,res)=>{
 try{
  let data=await Students.find({Mentor_Name:req.params.Mentor})
  res.status(200).send(data)
 }
 catch{
  res.status(500).send("Internal server error")
 }
})

//6

router.get("/Previously_Updated",async(req,res)=>{
  try{
  let data=await Students.find().limit(1).sort({updatedAt: -1})
  res.status(200).send(data)
  }
  catch{
    res.status(500).send("Internal server error")
  }
}
)


module.exports = router;
