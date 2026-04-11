
---

````markdown
# 🎓 Course Selling App – Complete Backend Notes

A complete documentation of my backend project (inspired by 100xDevs Course App).  
This covers every step from initialization → routing → database → authentication → validation.

---

## 🏗️ Project Setup

### Initialize Node Project
```bash
npm init -y
vi index.js
node index.js
npm install express mongoose jsonwebtoken
````

### Basic Express Structure

```js
const express = require("express");
const app = express();

app.post("/user/signup", (req, res) => {
  res.json({ message: "Signup endpoint" });
});

app.post("/user/signin", (req, res) => {
  res.json({ message: "Signin endpoint" });
});

app.get("/user/purchased", (req, res) => {
  res.json({ message: "user purchased endpoint" });
});

app.post("/course/purchase", (req, res) => {
  res.json({ message: "purchase endpoint" });
});

app.get("/courses/preview", (req, res) => {
  res.json({ message: "All Courses endpoint" });
});

app.listen(3000);
```

---

## 🧩 Routing in Express

We structure routes inside a **routes/** folder.

### 1️⃣ Using Custom Function

Create `routes/course.js`

```js
function createCourseRoutes(app) {
  app.post("/course/purchase", (req, res) => {
    res.json({ message: "purchase endpoint" });
  });

  app.get("/course/preview", (req, res) => {
    res.json({ message: "All Courses endpoint" });
  });
}

module.exports = { createCourseRoutes };
```

Use in `index.js`

```js
const express = require("express");
const app = express();

const { createUserRoutes } = require("./routes/user");
const { createCourseRoutes } = require("./routes/course");

createUserRoutes(app);
createCourseRoutes(app);

app.listen(3000);
```

---

### 2️⃣ Using Express Router (Better Way ✅)

`routes/course.js`

```js
const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
  res.json({ message: "purchase endpoint" });
});

courseRouter.get("/preview", (req, res) => {
  res.json({ message: "All Courses endpoint" });
});

module.exports = { courseRouter };
```

`index.js`

```js
const express = require("express");
const app = express();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(3000);
```

🧠 **Note:**

* No need to prefix `/course` again in routes.
* Use `courseRouter.post(...)` instead of `app.post(...)`.

---

## 🗄️ Database Design (MongoDB + Mongoose)

### 🧱 Database Collections

| Collection    | Fields                                                          |
| ------------- | --------------------------------------------------------------- |
| **Users**     | _id, email, password, firstName, lastName                       |
| **Admins**    | _id, email, password, firstName, lastName                       |
| **Courses**   | _id, title, description, price, imageUrl, creatorId (Admin ref) |
| **Purchases** | _id, courseId (Course ref), userId (User ref)                   |

---

### 🧩 `db.js`

```js
const mongoose = require("mongoose");
console.log("connected to mongo");
mongoose.connect("your-mongo-uri-here");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId
});

const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = { userModel, adminModel, courseModel, purchaseModel };
```

---

## ⚙️ Environment Variables (.env)

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=Abcdefg
```

### Import in code

```js
require("dotenv").config();
await mongoose.connect(process.env.MONGO_URI);
```

🧠 **Notes**

* Don’t use quotes `" "` in `.env`.
* Add `.env` to `.gitignore`.

---

## 🔐 Authentication & Middleware

### 🧱 Folder Structure

```
middleware/
  ├── user.js
  └── admin.js
config.js
```

### `config.js`

```js
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

module.exports = { JWT_USER_PASSWORD, JWT_ADMIN_PASSWORD };
```

---

### 🧰 `userMiddleware.js`

```js
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "Token missing ❌" });
  }

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    if (decoded) {
      req.userId = decoded.id; // ✅ small d fixed
      next();
    } else {
      res.status(403).json({ message: "Invalid token ❌" });
    }
  } catch (e) {
    res.status(403).json({ message: "Token verification failed ❌", error: e.message });
  }
}

module.exports = { userMiddleware };
```

---

## 👑 Admin Routes (`routes/admin.js`)

### 🧩 Signup

* Validate input using **Zod**
* Hash password using **bcrypt**

```js
const bcrypt = require("bcrypt");
const zod = require("zod");
const { adminModel } = require("../db");

const saltRounds = 4;

adminRouter.post("/signup", async (req, res) => {
  const requireBody = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(4),
    firstname: zod.string().min(3),
    lastname: zod.string().min(3),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(500).json({
      message: "Incorrect Data Format !!!",
      error: parseDataWithSuccess.error,
    });
  }

  const { email, password, firstname, lastname } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await adminModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    res.json({ message: "Signup succeeded ✅" });
  } catch (e) {
    res.status(404).json({ message: "Signup failed ❌" });
  }
});
```

---

### 🧩 Signin

```js
const user = await adminModel.findOne({ email });

if (!user) return res.status(404).json({ message: "Invalid Email" });

const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) return res.status(401).json({ message: "Incorrect Password" });

const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
res.json({ token });
```

---

### 🧠 Notes on `courseId`

* MongoDB auto-generates `_id`
* We send `_id` as `courseId` for readability
* When updating, always send `{ _id: courseId, creatorId: adminId }`
* Prevents unauthorized updates by other admins

---

## 👥 User Routes (`routes/user.js`)

### Signup & Signin

* Same logic as admin
* Uses `userModel` instead of `adminModel`

---

### 🛒 Purchase Course

```js
const { userMiddleware } = require("../middleware/user");

userRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({ userId, courseId });

  res.json({ message: "You have successfully bought the course ✅" });
});
```

---

### 🎓 View Purchased Courses

```js
userRouter.get("/purchased", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchases = await purchaseModel.find({ userId });
  const purchasedCourseIds = purchases.map(p => p.courseId);

  const coursesData = await courseModel.find({
    _id: { $in: purchasedCourseIds },
  });

  res.json({ purchasedCourses: coursesData });
});
```

---

## ✅ Common Mistakes I Fixed

* Used `.findOne()` instead of `.find()` for login
* Forgot dot in `user._id`
* Forgot to include `.` in `jwt.sign`
* Wrote `courceId` instead of `courseId` 🤦
* Forgot to add `app.use(express.json())`
* Case mismatch in middleware: `req.userID` vs `req.userId`

---

## 🧠 Zod Validation Example

```js
const zod = require("zod");

const requireBody = zod.object({
  email: zod.string().email().min(5),
  password: zod.string().min(4),
  firstname: zod.string().min(3),
  lastname: zod.string().min(3)
});

const parsed = requireBody.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ message: "Invalid Input" });
```

---

## 🧾 Future TODOS

* [ ] Replace JWT with cookie-based authentication
* [ ] Implement Mongoose `ref` population for purchases
* [ ] Add rate limiting middleware
* [ ] Add EJS frontend (optional)
* [ ] Create React frontend
* [ ] Improve error handling with middleware
* [ ] Use `asyncHandler` wrapper for cleaner async routes

---

### 🧩 Final Flow Overview

```
Frontend → /signup → DB entry created
Frontend → /signin → JWT returned
Frontend → /course/purchase → purchaseModel entry
Frontend → /user/purchased → all bought courses returned
```

---
**Project Completed ✅**
Well-structured backend for a full-featured Course Selling App using
*Express + MongoDB + JWT + Bcrypt + Zod Validation.*

```

---

```

## 📁 Folder Structure

    week 08 Course-Selling-App/
    │
    ├── 📂 Backend/
    │ ├── 📂 middleware/
    │ │ ├── admin.js
    │ │ └── user.js
    │ │
    │ ├── 📂 routes/
    │ │ ├── admin.js
    │ │ ├── course.js
    │ │ └── user.js
    │ │
    │ ├── .env
    │ ├── .env.example
    │ ├── config.js
    │ ├── db.js
    │ ├── index.js
    │ ├── package-lock.json
    │ ├── package.json
    │ ├── README.md
    │ └── tempCodeRunnerFile.js
    │
    ├── 📂 Frontend/
    │
    ├── 📝 notes.md
    └── 📝 notesImproved.md

```
---

Here’s your short **markdown note** version 👇

---

# 🧠 Bug Note: All Admins Getting Same ID

## 🐞 Issue:

Earlier code:

  ```js
    await adminModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname
    });
  ```

* ❌ Didn’t store the created admin in a variable.
* ❌ So couldn’t access unique `_id` → appeared like all IDs were same.

---

## ✅ Fixed Version:

    ```js
    const admin = await adminModel.create({
      email,
      password: hashedPassword,
      firstName: firstname,
      lastName: lastname
    });

    res.json({
      message: "Signup succeeded ✅",
      adminId: admin._id
    });
    ```

---

## 💡 Key Takeaway:

Always **store created documents** (`const admin = await Model.create(...)`)
→ Mongoose auto-generates a **unique `_id`** for every new record.
