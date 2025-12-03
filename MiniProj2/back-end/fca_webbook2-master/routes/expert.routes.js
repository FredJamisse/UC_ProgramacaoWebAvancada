const express = require('express');
let router = express.Router();

console.log("expert.routes.js carregado!");

const ExpertController = require('../controllers/expert.controller');
const AuthController = require("../controllers/auth.controller");

const { body, param, sanitizeBody } = require('express-validator');
const CONFIG = require("../config/config");

// ===============================
// /experts
// ===============================
router.route('/')
    .get(
        AuthController.checkAuth,
        ExpertController.get
    )
    .post(
        AuthController.checkAuth,
        [
            body('nome').isString().withMessage("O nome deve ser uma string."),
            body('contacto').isString().withMessage("O contacto deve ser uma string."),
            body('area').isString().withMessage("A área deve ser uma string."),
            sanitizeBody('nome').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
            sanitizeBody('area').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
        ],
        ExpertController.create
    );

// ===============================
// /experts/deactivate/:id
// ===============================
router.route("/deactivate/:id")
    .put(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.deactivate
    );

// ===============================
// /experts/activate/:id
// ===============================
router.route("/activate/:id")
    .put(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.activate
    );

// ===============================
// /experts/:id
// ===============================
router.route('/:id')
    .get(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.getOne
    )
    .put(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.update
    )
    .delete(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.delete
    );

module.exports = router;
