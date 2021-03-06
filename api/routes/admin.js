const express = require('express')
const router = express.Router()
const db = require('./../../db')



router.post('/createClass', (req, res,next) => {
  var promise1=new Promise(function(resolve,reject){
    var Class = req.body.class;
    var sub1=req.body.sub1;
    var sub2=req.body.sub2;
    var sub3=req.body.sub3;
    var sub4=req.body.sub4;
    var sub5=req.body.sub5;
    

     var sql = `insert into classes values(?,?,?,?,?,?);`;
    
    db.query(sql,[Class,sub1,sub2,sub3,sub4,sub5], function (error, results, fields) {
         if (error)         {                       reject(error);           return;           } 
      console.log('The solution is: ', results);


      var sql1='create table attendance'+Class+'( student_id int references student_details(student_id), attendance_date varchar(10) , day varchar(10) not null, '+sub1+'  varchar(10) default ? references subject_codes(subject_code)  , '+sub2+'  varchar(10) default ?  references subject_codes(subject_code) , '+sub3+'  varchar(10) default ? references subject_codes(subject_code) , '+sub4+'  varchar(10) default ?  references subject_codes(subject_code) , '+sub5+'  varchar(10) default ? references subject_codes(subject_code)  ,  primary key(student_id,attendance_date)   );'
        

      db.query(sql1,['N','N','N','N','N'], function (error, results, fields) {
           if (error)         {                       reject(error);           return;           } 
        console.log('The solution is: ', results);
  
        var sql3 = 'select * from admin_details where admin_id=?;';
      
        db.query(sql3,[req.user], function (error, results, fields) {
             if (error)         {                       reject(error);           return;           } 
          console.log('The solution is: ', results);
          if(results[0]==null)
          {
              res.send(null);
           }
          else{
           res.render('../views/adminDashboard', {username:results[0].admin_name});
              
          }
       
        })
      })
    })
// var cw='classes';
//     var sql0=`select * from`+' '+cw+`;`

    // db.query(sql0, function (error, results, fields) {
    //        if (error)         {                       reject(error);           return;           } 
    //     console.log('The solution is: ', results);
    //   })


  })

    promise1.catch(function(error) {
      console.log(error);
      res.render('../views/wrong', {success:"You have entered an invalid input"});
    });
    
})

router.post('/studentDetails', (req, res,next) => {
   
  var promise1=new Promise(function(resolve,reject){

    var id = parseInt(req.body.id);
    var name= req.body.name;
    var Class=req.body.class;
     var sql = `insert into student_details values(?,?,?);`;
    
    db.query(sql,[id,name,Class], function (error, results, fields) {
      if (error) 
      {
        reject(error);
        return;

      }
      console.log('The solution is: ', results);
      var sql3 = 'select * from admin_details where admin_id=?;';
      
      db.query(sql3,[req.user], function (error, results, fields) {
        if (error)
        {
          

          reject(error);
          return;


        } 
        console.log('The solution is: ', results);
        if(results[0]==null)
        {
            res.send(null);
         }
        else{
         res.render('../views/adminDashboard', {username:results[0].admin_name});
            
        }
     
      })
   
    })

  })

  promise1.catch(function(error) {
    console.log(error);
    res.render('../views/wrong', {success:"You have entered an invalid input"});
  });

  
})
router.post('/teacherDetails', (req, res,next) => {
  var promise1=new Promise(function(resolve,reject){
    
    var id = parseInt(req.body.id);
    var name= req.body.name;
     var sql = `insert into teacher_details values(?,?);`;
    
    db.query(sql,[id,name], function (error, results, fields) {
         if (error)         {                       reject(error);           return;           } 
      console.log('The solution is: ', results);
      var sql3 = 'select * from admin_details where admin_id=?;';
      
      db.query(sql3,[req.user], function (error, results, fields) {
           if (error)         {                       reject(error);           return;           } 
        console.log('The solution is: ', results);
        if(results[0]==null)
        {
            res.send(null);
         }
        else{
         res.render('../views/adminDashboard', {username:results[0].admin_name});
            
        }
     
      })
    })


  })

    promise1.catch(function(error) {
      console.log(error);
      res.render('../views/wrong', {success:"You have entered an invalid input"});
    });
})

// router.post('/subjectCodes', (req, res,next) => {
   
//     var code = req.body.code;
//     var name= req.body.name;
//      var sql = `insert into subject_codes values(?,?);`;
    
//     db.query(sql,[code,name], function (error, results, fields) {
//          if (error)         {                       reject(error);           return;           } 
//       console.log('The solution is: ', results);
//       res.send({success:true})
//     })
// })
// router.post('/subjectTeacherClass', (req, res,next) => {
   
//     var id = parseInt(req.body.id);
//     var code= req.body.code;
//     var Class=req.body.class;

//     console.log(req.body.class);

//      var sql = `insert into subject_teacher_class values(?,?,?);`;
    
//     db.query(sql,[id,code,Class], function (error, results, fields) {
//          if (error)         {                       reject(error);           return;           } 
//       console.log('The solution is: ', results);
//       res.send({success:true})
//     })
// })
// router.post('/teacherTimeTable', (req, res,next) => {
   
//     var id = parseInt(req.body.id);
//     var day= req.body.day;
//     var Class1 = req.body.class1;
//     var Class2 = req.body.class2;
//     var Class3 = req.body.class3;
//     var Class4 = req.body.class4;
//     var Class5 = req.body.class5;
//     var Class6 = req.body.class6;
//      var sql = `insert into teacher_time_table values (?,?,?,?,?,?,?,?)`;
    
//     db.query(sql,[id,day,Class1,Class2,Class3,Class4,Class5,Class6], function (error, results, fields) {
//          if (error)         {                       reject(error);           return;           } 
//       console.log('The solution is: ', results);
//       res.send({success:true})
//     })
// })
router.post('/studentAuth', (req, res,next) => {
   
  var promise1=new Promise(function(resolve,reject){
    var username=req.body.username;
    var password=req.body.password;
    var id = parseInt(req.body.id);
     var sql = `insert into student_auth values(?,?,?);`;
    
    db.query(sql,[username,password,id], function (error, results, fields) {
         if (error)         {                       reject(error);           return;           } 
      console.log('The solution is: ', results);
      var sql3 = 'select * from admin_details where admin_id=?;';
      
      db.query(sql3,[req.user], function (error, results, fields) {
           if (error)         {                       reject(error);           return;           } 
        console.log('The solution is: ', results);
        if(results[0]==null)
        {
            res.send(null);
         }
        else{
         res.render('../views/adminDashboard', {username:results[0].admin_name});
            
        }
     
      })
    })

  })


    promise1.catch(function(error) {
      console.log(error);
      res.render('../views/wrong', {success:"You have entered an invalid input"});
    });
})
router.post('/teacherAuth', (req, res,next) => {
   
  var promise1=new Promise(function(resolve,reject){
    var username=req.body.username;
    var password=req.body.password;
    var id = parseInt(req.body.id);
     var sql = `insert into teacher_auth values(?,?,?);`;
    
    db.query(sql,[username,password,id], function (error, results, fields) {
         if (error)         {                       reject(error);           return;           } 
      console.log('The solution is: ', results);
    })
    var sql3 = 'select * from admin_details where admin_id=?;';
      
    db.query(sql3,[req.user], function (error, results, fields) {
         if (error)         {                       reject(error);           return;           } 
      console.log('The solution is: ', results);
      if(results[0]==null)
      {
          res.send(null);
       }
      else{
       res.render('../views/adminDashboard', {username:results[0].admin_name});
          
      }
   
    })

  })

    promise1.catch(function(error) {
      console.log(error);
      res.render('../views/wrong', {success:"You have entered an invalid input"});
    });
})


exports=module.exports = router