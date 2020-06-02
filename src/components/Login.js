import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/authService";

const Login = ({ location }) => {
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

    const handleSubmit = async () => {
        try {
            await auth.login(account);
            window.location = location.state ? location.state.redirectPath : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const { error } = ex.response.data;
                setErrors({ ...errors, email: error });
            }
        }
    };

    return (
        <>
            {!auth.getCurrentUser() ? (
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
            ) : (
                <Redirect to="/movies" />
            )}
        </>
    );
};

export default Login;
