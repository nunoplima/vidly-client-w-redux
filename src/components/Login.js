import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

const Login = () => {
    const [account, setAccount] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(4).max(12).required().label("Password"),
    };

    const inputs = [
        { name: "email", type: "email", label: "E-mail adress", tag: "input" },
        { name: "password", type: "password", label: "Password", tag: "input" },
    ];

    const handleSubmit = () => {
        console.log("Submitted");
    };

    return (
        <>
            <h1>Login</h1>

            <Form
                submitText="Login"
                schema={schema}
                inputs={inputs}
                data={account}
                errors={errors}
                setData={setAccount}
                setErrors={setErrors}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default Login;
