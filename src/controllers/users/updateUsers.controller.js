// const { validationResult } = require("express-validator");
// const { saveData, loadData } = require("../../database");
// const bcrypt = require('bcryptjs')
/*
module.exports = (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  const users = loadData("users");

  if (errors.isEmpty()) {
    const { name, username, email, password, passwordConfirm } = req.body;

    const userFind = users.find(u => u.id === +id);

    const usersMap = users.map((u) => {
      if (u.id === +id) {
        const userEdit = {
          ...u,
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password: password ? bcrypt.hashSync(password, 10) : userFind.password,
          role: "REGULAR",
          avatar: "default-avatar.jpg"

        };

        return userEdit;
      }

      return u;
    });
    saveData(usersMap, "users");
    res.redirect("/");
  } else {
    const errorsArray = errors.array();
    res.status(422).json({ errors: errorsArray });
  }
}; 
*/

const db = require('../../db/models');
const { where } = require("sequelize");
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, surname, email, password, passwordConfirm } = req.body;
    const userFind = users.find(u => u.id === +id);

    const usersMap = users.map((u) => {
      if (u.id === +id) {
        const userEdit = (req,res) => {

        db.Users.update({
          name: name,
          surname: surname,
          email: email,
          password: password ? bcrypt.hashSync(password, 10) : userFind.password,
          id_role: "REGULAR",
          avatar: "default-avatar.jpg"
        }, {
          where: {
            id: req.body.id
          }
        })
      }
         return userEdit

         .catch((err) => {
          res.send(err.message)
        })

          // .then(user => {
          //   res.redirect('/', { user });
          // })
          // .catch((err) => {
          //   res.send(err.message)
          // })
      }

    })
    saveData(usersMap, "users");
    res.redirect("/")
  
    .catch((err) => {
      res.send(err.message)
    })
    
  } else {
    const errorsArray = errors.array();
    res.status(422).json({ errors: errorsArray })

    .catch((err) => {
      res.send(err.message)
    })
  }
}