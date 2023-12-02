import jwt from "jsonwebtoken";

const userMiddleware = {

  validateRegister: (req, res, next) => {

    /* Nombre de usuario - mínimo 3 letras */

    if (!req.body.user || req.body.user.length < 3) {

      return res.status(400).send({ message: "Tu usuario debe contener al menos 3 caracteres." })

    }

    /* Contraseña con 6 caracteres mínimo */

    if (!req.body.password || req.body.password.length < 6) {

      return res.status(400).send({ message: "Tu contraseña debe contener al menos 6 caracteres." })

    }

    next()

  },

  isLoggedIn: (req, res, next) => {

    try {

      const token = req.get("Authorization")
      const decoded = jwt.verify(token, "SECRETKEY")

      req.userData = decoded

      next()

    } catch (err) { return res.status(401).send({ msg: "Your session is not valid!" }) }

  },

}

export default userMiddleware;
