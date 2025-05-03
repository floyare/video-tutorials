"use client"

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

type Errors = {
    name?: string;
    email?: string;
};

const BadForm: React.FC = () => {
    const [values, setValues] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState<{ [K in keyof typeof values]?: boolean }>({});

    const validate = (vals: typeof values): Errors => {
        const errs: Errors = {};
        if (!vals.name) errs.name = "Name is required";
        if (!vals.email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(vals.email)) errs.email = "Email is invalid";
        return errs;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(values));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setTouched({ name: true, email: true });
        setSubmitted(true);
        if (Object.keys(validationErrors).length === 0) {
            // handle successful submit here
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 bg-white text-neutral-950 rounded-lg shadow space-y-6"
        >
            <div>
                <h2 className="mb-4">❌ Bad form example</h2>
                <Label htmlFor="name" className="mb-1 block">
                    Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    className={cn(errors.name && touched.name && "border-red-500")}
                    placeholder="Enter your name"
                />
                {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
            </div>
            <div>
                <Label htmlFor="email" className="mb-1 block">
                    Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    className={cn(errors.email && touched.email && "border-red-500")}
                    placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
            </div>
            <Button type="submit" className="w-full">
                Submit
            </Button>
            {submitted && Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mt-4">
                    <strong>Form has errors:</strong>
                    <ul className="list-disc list-inside text-sm mt-1">
                        {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default BadForm;