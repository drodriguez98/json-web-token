import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import pool from "../database/db.js"

const promisePool = pool.promise();

const login = async (req, res) => {

  try {
    const { userInput, passwordInput } = req.body;

    const [[user]] = await promisePool.query(`SELECT * FROM USERS WHERE LOWER(user) = LOWER(?)`, [userInput])

    if (!user) { return res.status(400).send({ message: "Usuario y/o contraseña INCORRECTOS" }) }

    bcrypt.compare(passwordInput, user.password, (bErr, bResult) => {

      if (bErr) { console.log(bErr); }

      if (bResult) {

        const token = jwt.sign(

          {

            usuario: user.usuario,
            id: user.id,

          }, "SECRETKEY", { expiresIn: "7d" }

        );

        return res.status(200).send({ msg: "¡LOGUEADO!", token })

      }

      return res.status(401).send({ msg: "[ERROR] Usuario y/o contraseña INCORRECTOS" });

    })

  } catch (err) { console.log(err) }

}

export { login }