"use client"

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .refine(async (value) => {
            await new Promise((r) => setTimeout(r, 500));
            return !(value.toLowerCase() === "john");
        }, { message: "Name is already taken" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type FormValues = {
    name: string;
    email: string;
    password: string;
};

const GoodForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        alert(JSON.stringify(data, null, 2));
        reset();
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Good form ✅</h2>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        {...register("name")}
                        disabled={isSubmitting}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                        <span className="text-sm text-red-600">{errors.name.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        disabled={isSubmitting}
                        className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-600">{errors.email.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        disabled={isSubmitting}
                        className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                        <span className="text-sm text-red-600">{errors.password.message}</span>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
};

export default GoodForm;