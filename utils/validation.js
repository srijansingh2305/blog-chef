import {check, validationResult} from "express-validator";


const manageErrors = (cb) => (req, res, next) =>{
    const error = validationResult(req);
    if(error.isEmpty()) return next();
    cb(error.array(), req, res);
}

export const loginUserValidation = [
    check("email").isEmail().withMessage("email is missing or invalid"), 
    check("password").notEmpty().withMessage("password is missing or invalid"),
    manageErrors((error, req, res) => res.status(422).json({error})),
];

export const signUpUserValidation = [
    check('email').isEmail().withMessage("email is missing or invalid"),
    check("name").notEmpty().withMessage("name is empty").trim().escape(),
    check("password").notEmpty().withMessage("password is empty").isLength({min: 6}).withMessage("password must have atleast 6 characters"),
    manageErrors((error, req, res)=> res.status(422).json({error})),
];

export const storePostValidation = [
    check("post.title").notEmpty().withMessage("title field should not be empty")
    .escape(),
    check("post.content").notEmpty().withMessage("content field should not be empty")
    .escape(),
    check("post.user").notEmpty().withMessage("user field should not empty")
    .isString(),
    manageErrors((error, req, res)=> res.status(422).json({error})),
];

export const loginAdminvalidation = [
    check("email").isEmail().notEmpty().trim().escape(),
    check("password").notEmpty().trim().escape(),
    manageErrors((error, req, res)=> res.redirect(req.originalUrl)),
];

export const signUpAdminValidation = [
    check("name").notEmpty().trim().escape(),
    check("email").isEmail().notEmpty().trim().escape(),
    check("password").notEmpty().trim().isLength({min:6}).escape(),
    manageErrors((error, req, res)=> res.redirect(req.originalUrl)),
];


export const jwtValidation = [
    check("token").isJWT().notEmpty(),
    manageErrors((error, req, res)=> res.status(422).json({error})),
];