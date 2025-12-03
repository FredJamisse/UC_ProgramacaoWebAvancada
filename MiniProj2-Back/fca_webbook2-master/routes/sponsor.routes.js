const express = require('express');
let router = express.Router();

const SponsorController = require('../controllers/sponsor.controller');
const AuthController = require("../controllers/auth.controller");

const { body, param } = require('express-validator');

// /sponsors
router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(
        AuthController.checkAuth,
        [
            body('nome').isString(),
            body('contacto').isString(),
            body('animalPatrocinado').isMongoId()
        ],
        SponsorController.create
    );

// /sponsors/:id
router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.delete);

module.exports = router;
