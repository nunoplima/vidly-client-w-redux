import React from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";


const Form = ({ submitText, schema, inputs, data, errors, setData, setErrors, onSubmit }) => {    
    const handleChange = (e) => {
        const { name: input, value } = e.target;
        setData({ ...data, [input]: value });
        
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
        const { error } = Joi.validate(data, schema, options);
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
        onSubmit();
    };

    const renderSelect = (input) => {
        const { label, name, options } = input;
        return (
            <Select
                key={label}
                label={label}
                name={name}
                options={options}
                value={data[name]}
                error={errors[name]}
                onChange={handleChange}
            />
        );
    };

    const renderInput = (input) => {
        const { label, name, type } = input;
        return (
            <Input
                key={label}
                type={type}
                label={label}
                name={name}
                value={data[name]}
                error={errors[name]}
                onChange={handleChange}
            />
        );
    };

    const renderObj = {
        input: renderInput,
        select: renderSelect,
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {inputs.map(input => renderObj[input.tag](input))}
               
                <button className="btn btn-primary" disabled={validate()}>{submitText}</button>
            </form> 
        </>
    );
};

export default Form;