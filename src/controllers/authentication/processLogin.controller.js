const { loadData } = require("../../database");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
  const { email, password, recordame} = req.body;
  const users = loadData("users");
  const errors = validationResult(req);

  const userFind = users.find((u) => u.email === email);

  if(errors.isEmpty()){

      req.session.userLogin = {
      id: userFind.id, 
      name: userFind.name,
      username: userFind.username,
      rol: userFind.rol,    
      avatar: userFind.avatar
  
      };

       if(recordame ) res.cookie("userLogin", req.session.userLogin, {maxAge: 6000 * 30 * 100})
  
       res.redirect("/")

  } else {

    res.render("./authentication/login", {
      old: req.body,
      errors: errors.mapped(),
    });

  }
};

// const bcrypt = require("bcryptjs");
// const { validationResult } = require("express-validator");
// const db = require("../../db/models");

// module.exports = (req, res) => {
//   const { email, password, remember } = req.body;
//   // const users = loadData("users");

//   const userFind = users.find((u) => u.email === email);
//   const errors = validationResult(req);
//   db.User.findOne({
//     where: {
//       email,
//     },
//     include:["role"]
//   }).then((user) => {
  
//     if (!user) res.send("El usuario no existe");

//     const isPasswordValid = bcrypt.compareSync(password, user?.password);

//     if (!isPasswordValid) res.send("El password es incorrecto");

//     req.session.userLogin = {
//       id: user.id,
//       name: user.name,
//       surname: user.surname,
//       avatar: user.avatar,
//       role: user.role.name,
//     };

//     if (remember)
//       res.cookie("userLogin", req.session.userLogin, { maxAge: 6000 * 30 });

//     // res.redirect("/");
//     //    } else {

//    res.render("./authentication/login", {
//      old: req.body,
//     errors: errors.mapped(),
//   });
//   });
// };