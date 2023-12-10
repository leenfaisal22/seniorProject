//const bcrypt = require('bcrypt');
var UserDB = require("../model/logins");
// create and save new user         > INSERT STATEMENT
exports.create = (req,res)=>
{
    // validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content can not be emptry"});
        return;
    }
    //const saltRounds = 10;
    //const plainPassword = req.body.Password;
    //bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => 
    //{
        if (err) {
          res.status(500).send({ message: 'Error while encrypting password' });
        } else {
          // create user object with hashed password
          const user = new UserDB({
            Name: req.body.Name,
            Email: req.body.Email,
            Username: req.body.Username,
            //Password: hashedPassword,
            Password: req.body.Password,
            Gender: req.body.Gender,
            Status: req.body.Status,
            UType: req.body.UType
        });
    
          // save user to database
          user.save(user)
            .then((data) => {
              res.redirect('/admin_dashboard');
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || 'Some error occurred while creating new user',
              });
            });
        }
      //});

    // // Passing values in user object
    // const user =new UserDB({
    //     Username:req.body.Username, 
    //     Password:req.body.Password,
    //     Email:req.body.Email,
    //     Name:req.body.Name,
    //     UType:req.body.UType, 
    //     Phone:req.body.Phone,
    //     Gender:req.body.Gender,
    //     Status:req.body.Status,
    // })
    // // Now Save in DB
    // user.save(user).then(data=>
    //     {
    //         res.redirect("/admin_managememberships");
    //         //res.send(data)
    //     }).catch(err =>{res.status(500).send({message:err.message || "some error occured while createing new user"});});
}
// > SELECT STATEMENT 
exports.find = (req,res)=>
{
    if(req.query.id)
    {
        const id=req.query.id;
        UserDB.findById(id)
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message:"Invalid Id or Record not exist with id "+id})
            }
            else
            {
                res.send(data);
            }
        })
    }
    else
    {
        UserDB.find().then(user=>{res.send(user)})
        .catch(err=>{res.status(500).send({message:err.message || "Error occured while retrieving records"})})
    }
}
// > UPDATE STATEMENT
exports.update = (req,res)=>
{
    if(!req.body)
    {
        return res
        .status(400)
        .send({message:"Fill all required Data to Update User"})
    }
    const id = req.params.id;
    UserDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message: "record cant be updated, may be User not found"})
        }
        else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error occured in Updating row"})
    })
}
// > DELETE STATEMENT
exports.delete = (req,res)=>
{
    const id = req.params.id;
    UserDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message: "record cant be deleted, may be User not found"})
        }
        else{
            res.send({message:"Record Deleted"})
        }
    })
    .catch(err =>{
        res.status(500).send({message:"could not be deleted"})
    })
}