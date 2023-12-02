import express from "express"

import pool from "../database/db.js"
import { register } from "../controllers/register.js"
import { login } from "../controllers/login.js"
import userMiddleware from "../middleware/users.js"

const router = express.Router()

const promisePool = pool.promise()

router.get("/wellcome", (req, res) => { 
  
  res.send('Bienvenido! Inicia sesión para obtener un token y acceder a tu perfil privado.')

})

router.post("/register", userMiddleware.validateRegister, register)

router.post("/login", login)

router.get("/profile", userMiddleware.isLoggedIn, async (req, res, next) => {

  console.log(req.userData)

  const [[user]] = await promisePool.query(`SELECT * FROM USERS WHERE LOWER(id) = LOWER(?)`, [req.userData.id])

  res.json({

    ID: user.id,
    USER: user.user,
    PASSWORD: user.password,
    DATEADDED: user.dateAdded,

  })

})

export default router;