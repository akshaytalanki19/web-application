import {body,ValidationChain,validationResult} from "express-validator";
import {NextFunction,Request,Response} from "express";
export const validate =(validations:ValidationChain[] )=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            const result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors=validationResult(req);
        if(errors.isEmpty()){
               return next();
        }
        return res.status(422).json({errors: errors.array() });
    };
};

export const loginValidator =[
    body("email").trim().isEmail().withMessage("Email is requierd"),
    body("password").trim().isLength({min:6}).withMessage("password shioluid contain min 6 character")
];

export const signUpValidator =[
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
