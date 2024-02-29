import { Router } from "express";
import { check } from "express-validator";
import {
    publicationsPost,
    publicationsPut,
} from "./publications.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeUsuarioById } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("title", "The title is mandatory"),
        check("category", "The category is mandatory"),
        check("text", "The text is required"),
        validarCampos,
    ],
    publicationsPost
);

export default router;