import React, { useState } from "react";
import _ from "lodash";
import Joi from "joi-browser";
import Input from "./common/Input";

const Login = () => {
    const [account, setAccount] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const { email, password } = account;

    const schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(4).max(12).required().label("Password"),
    };

    const handleChange = (e) => {
        const { name: input, value } = e.target;
        setAccount({ ...account, [input]: value });
        
        const errorMessage = validateProperty(input, value);
        const errorsCopy = { ...errors }; 
        if (errorMessage) errorsCopy[input] = errorMessage;
        else delete errorsCopy[input];
        setErrors(errorsCopy);
    };

    const validateProperty = (input, value) => {
        const obj = { [input]: value };
        const subSchema = { [input]: schema[input] }; 
        const { error } = Joi.validate(obj, subSchema);
        if (error) return error.details[0].message;
        return null;
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(account, schema, options);
        if (error) {
            return error.details.reduce((acc, cur) => ({ ...acc, [cur.path[0]]: cur.message}), {});
        } 
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (errors) {
            setErrors(errors);
            return;
        }
        // call server
        console.log("Submitted");
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    className="form-control"
                    name="email"
                    type="text"
                    label="Email adress"
                    value={email}
                    error={errors.email}
                    onChange={handleChange}
                />
                <Input
                    className="form-control"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" disabled={validate()}>Login</button>
            </form>
        </>
    );
};

export default Login;
