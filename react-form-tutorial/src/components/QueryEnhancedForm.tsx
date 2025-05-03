"use client"

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

type FormValues = {
    name: string;
    email: string;
    password: string;
};

async function checkUsernameExists(username: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 500));
    return username.toLowerCase() === "john";
}

const QueryEnhancedFormInner: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
        reset,
        watch,
        trigger,
    } = useForm<FormValues>();

    const nameValue = watch("name");

    const {
        refetch: refetchUsername,
        isFetching: isCheckingUsername,
    } = useQuery({
        queryKey: ["checkUsername", nameValue],
        queryFn: () => checkUsernameExists(nameValue),
        enabled: false,
    });

    const handleNameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("name");
        if (!errors.name && e.target.value) {
            const { data } = await refetchUsername();
            if (data) {
                setError("name", { type: "manual", message: "Username is already taken" });
            } else {
                clearErrors("name");
            }
        }
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        alert(JSON.stringify(data, null, 2));
        reset();
    };

    return (
        <div className="flex items-center justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Form with useQuery 🪄</h2>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        {...register("name", {
                            required: "Name is required",
                            minLength: { value: 2, message: "Name must be at least 2 characters" },
                        })}
                        disabled={isSubmitting}
                        className={errors.name ? "border-red-500" : ""}
                        onBlur={handleNameBlur}
                    />
                    {isCheckingUsername && (
                        <span className="text-sm text-gray-500">Checking username...</span>
                    )}
                    {errors.name && (
                        <span className="text-sm text-red-600">{errors.name.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
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
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        })}
                        disabled={isSubmitting}
                        className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                        <span className="text-sm text-red-600">{errors.password.message}</span>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting || isCheckingUsername} className="w-full">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
};

const QueryEnhancedForm: React.FC = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <QueryEnhancedFormInner />
        </QueryClientProvider>
    );
};

export default QueryEnhancedForm;
