import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/authService";

const Register = () => {
    const [account, setAccount] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});

    const schema = {
        username: Joi.string().min(3).max(12).required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(4).max(12).required().label("Password"),
    };

    const inputs = [
        { name: "username", type: "text", label: "Username", tag: "input" },
        { name: "email", type: "email", label: "E-mail adress", tag: "input" },
        { name: "password", type: "password", label: "Password", tag: "input" },
    ];

    const handleSubmit = async () => {
        try {
            await auth.register(account);
            window.location = "/";
        } catch(ex) {
            if (ex.response && ex.response.status === 400) {
                const { error } = ex.response.data;
                setErrors({ ...errors, email: error});
            }
        }
    };

    return (
        <>
            <h1>Register</h1>

            <Form
                submitText="Register"
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

export default Register;
