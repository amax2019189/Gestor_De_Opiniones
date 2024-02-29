import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosPost,
    getUsuarioById,
    usuariosPut,
} from "./user.controller.js";
import {
    existeEmail,
    existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/",
  [
    check("nombre", "The name is required").not().isEmpty(),
    check("password", "The password must be greater than 6 characters").isLength({
      min: 6,
    }),
    check("correo", "This is not a valid email").isEmail(),
    check("correo").custom(existeEmail),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("correo", "Email is mandatory").isEmail(),
    check("correo").custom(existeEmail),
    validarCampos,
  ],
  usuariosPut
);

export default router;