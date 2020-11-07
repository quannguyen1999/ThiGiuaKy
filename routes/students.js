//B0 students -> to in daos.js 
//B1 studentsDao -> to name + Dao 

//B2  change in post create new 
// const classroom = {
//   id: uuid.v1(),
//   ma_lop: req.body.ma_lop,
//   ten: req.body.ten
// }

//B3 ma_sinhvien to id you want

//B4 change update

var express = require('express');
var router = express.Router();

const studentsDao = require('../daos/students.dao')
var uuid = require('node-uuid');
require('dotenv').config()

// Get all
router.get('/students', async (req, res) => {
    const students = await studentsDao.getAll();
    res.send(students);
  })

  
  // create new user
router.post('/students', async (req, res) => {
    const student = {
      id: uuid.v1(),
      ma_sinhvien: req.body.ma_sinhvien,
      ten_sinhvien: req.body.ten_sinhvien,
      namsinh: req.body.namsinh,
      id_lop: req.body.id_lop,
      avatar: req.body.avatar
    }
    const success = await studentsDao.add(student)
    if(success) {
      res.send('Create Success');
    } else {
      res.status(400).send("Invalid")
    }
  })

  // update user by ma_sinhvien
router.put('/students/:id', async (req, res) => {
    const student = {
      ma_sinhvien: req.params.id,
      ten_sinhvien: req.body.ten_sinhvien,
      namsinh: req.body.namsinh,
      id_lop: req.body.id_lop,
      avatar: req.body.avatar
    }
    const success = await studentsDao.update(student);
    if(success) {
      res.send('Update Success');
    } else {
      res.status(400).send("Invalid")
    }
  })
// delete user by ma_sinhvien
router.delete('/students/:id', async (req, res) => {
    const ma_sinhvien = req.params.id;
    const success = await studentsDao.delete(ma_sinhvien);
    if(success) {
      res.send('Delete Success');
    } else {
      res.status(400).send("Invalid")
    }
  })

  module.exports = router;