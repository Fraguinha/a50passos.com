// Requires
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../../models/user-model";

// Functions
const setupDefaultAdmin = () => {
  User.find((err, res) => {
    if (res.length === 0) {
      const defaultAdmin = new User({
        email: "admin@admin",
        password: "admin"
      });
      bcrypt.genSalt(10, (err2, salt) => {
        bcrypt.hash(defaultAdmin.password, salt, (err3, hash) => {
          defaultAdmin.password = hash;
          defaultAdmin.save();
        });
      });
    }
  });
};

const startup = (database: string) => {
  mongoose
    .connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .catch(err => {
      console.error(err);
      startup(database);
    });
  const db = mongoose.connection;
  db.on("open", () => {
    console.log("Connected to database");
    setupDefaultAdmin();
  });
};

export = { startup };
