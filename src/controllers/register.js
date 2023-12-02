import bcrypt from "bcryptjs"
import { randomUUID } from 'node:crypto'

import pool from "../database/db.js"

const promisePool = pool.promise()

const register = async (req, res) => {

  try {

    const { user, password } = req.body

    const [rows] = await promisePool.query(`SELECT * FROM USERS WHERE LOWER(user) = LOWER(?)`, [user])

    /* Nombre de Usuario no Disponible*/

    if (rows.length) {

      return res.status(409).send({ msg: `[ERROR] El nombre de usuario ${user} no se encuentra DISPONIBLE` })

    } else {

      bcrypt.hash(password, 10, async (err, hash) => {

        if (err) { return res.status(500).send({ msg: `[ERROR] ${err}` }) }

        const [rows] = await promisePool.query(`INSERT INTO USERS (id, user, password, dateAdded) VALUES (?, ?, ?, now())`, [randomUUID(), user, hash]) 

        res.status(201).send({ message: `[EXITO] El Usuario ${user} ha sido CREADO` })

      })

    }

  } catch (err) {

    console.error(err);
    res.status(500).send({ msg: `[ERROR] Error en el servidor` })

  }

}

export { register }