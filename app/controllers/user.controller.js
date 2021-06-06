const db = require("../models");
const User = db.users;

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user_id) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a user
    const user = new User({
      user_id: req.body.user_id,
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      email_verified_at: req.body.email_verified_at,
      two_factor_secret: req.body.two_factor_secret,
      two_factor_recovery_codes: req.body.two_factor_recovery_codes,
      current_team_id: req.body.current_team_id,
      profile_photo_path: req.body.profile_photo_path,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      fb_id: req.body.fb_id,
      google_id: req.body.google_id,
      address: req.body.address,
      ward: req.body.ward,
      district: req.body.district,
      province: req.body.province,
      gender: req.body.gender,
      birthday: req.body.birthday,
      phone: req.body.phone,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Save user in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };
  

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// Find a single user with an id
exports.findOne = (req, res) => {
    const user_id = req.params.user_id;
  
    User.findOne({user_id:user_id})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + user_id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id=" + user_id });
      });
  };

// Update a user by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`
          });
        } else res.send({ message: "user was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };
  

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    user.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        } else {
          res.send({
            message: "user was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  };
  

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    user.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} users were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };
  

// Find all published users
exports.findAllPublished = (req, res) => {
    user.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };
  
