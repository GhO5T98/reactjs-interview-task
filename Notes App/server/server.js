
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");

const app = express();
const config = require("./config");
app.use(cors());

const jwtSecretKey = fs.readFileSync("secretKey.txt", "utf-8");

//Db Connection//
mongoose.connect(
  "mongodb+srv://NotesAdmin:Tx9MW6NgwWWsXPpY@notesappdb.f4otcd3.mongodb.net/NotesApp?retryWrites=true&w=majorityWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidHostnames: true,
  }
);
//Db Connection//

//User Schema//
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});
//User Schema//

//Category Schema//
const CategorySchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});
//Category Schema//

//Notes Schema//
const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
//Notes Schema//

const User = mongoose.model("User", UserSchema);
const Category = mongoose.model("Category", CategorySchema);
const Note = mongoose.model("Note", NoteSchema);

app.use(bodyParser.json());

//Authentication Middleware//
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("No token provided.");

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    req.userId = decoded.id;
    next();
  });
};
//Authentication Middleware//


function generateJWT(userId) {
  const options = { expiresIn: "1d" };
  return jwt.sign({ id: userId }, jwtSecretKey, options);
}


//Register Router//
app.post("/register", async (req, res) => {
  const userInfos = req.body;
  try {
    if (userInfos.email == " " && userInfos.fullName == " ") {
      return res.status(404).send("Field are empty");
    }
    if (userInfos.password < 6) {
      return res.status(404).send("Short password");
    }

    let foundUser = await User.findOne({ email: userInfos.email }).exec();

    if (foundUser) {
      return res.status(400).send("This user exist");
    } else {
      const salt = await bcrypt.genSalt(10);

      let hashed = await bcrypt.hash(userInfos.password, salt);
      const newUser = new User({
        fullName: userInfos.fullName,
        email: userInfos.email,
        password: hashed,
      });
      await newUser.save();
      const token = generateJWT(user._id);
      return res.status(200).send("User Created");
    }
  } catch (error) {
    res.status(500).send("Not created " + error);
  }
});
//Register Router//

//Login Router//
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Authentication failed");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).send("Authentication failed");

    const token = generateJWT(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Error authenticating user");
  }
});
//Login Router//

//Create Categories Router//
app.post("/category", verifyToken, async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      userId: req.userId,
    });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send("Error creating category");
  }
});
//Create Categories Router//


//Get Categories Router//
app.get("/categories", verifyToken, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId }).populate(
      "notes"
    );
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
});
//Get Categories Router//

//Create Note Router//
app.post("/note", verifyToken, async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
    });
    await note.save();

    const category = await Category.findById(req.body.categoryId);
    category.notes.push(note);
    await category.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).send("Error creating note");
  }
});
//Create Note Router//

//Get Notes Router//
app.get("/getNotes", async (req, res) => {
  try {
    const allNotes = await Note.find({});
    res.status(200).send(allNotes);
  } catch (err) {
    res.status(500).send("Date not shown" + err);
  }
});
//Get Notes Router//

// //Delete Router//
// app.delete("/note/:noteId", verifyToken, async (req, res) => {
//   try {
//     const noteId = req.params.noteId;
//     await Note.findByIdAndDelete(noteId);
//     res.status(200).send("Note deleted successfully");
//   } catch (error) {
//     res.status(500).send("Error deleting note");
//   }
// });
// //Delete Router//



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
