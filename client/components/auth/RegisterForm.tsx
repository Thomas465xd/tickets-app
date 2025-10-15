"use client";
import { createAccount } from "@/src/api/AuthAPI";
import { RegisterUserForm } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";
import ErrorMessage from "../ui/ErrorMessage";

export default function RegisterForm() {
    const initialValues : RegisterUserForm = {
        name: "", 
        email: "",
        password: "", 
        confirmPassword: ""
    }

    const { register, handleSubmit, reset, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: initialValues
    });

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: createAccount, 
        onError: (error) => {
            console.log("🔴 Error capturado:", error);

            // Type guard for custom error shape
            const customError = error as Error & {
                type?: string;
                errors?: { field: string; message: string }[];
                message?: string;
            };

            // Handle validation errors (field-specific)
            if (customError.type === 'validation' && customError.errors) {

                // Show ALL error messages in toast (one toast per error)
                customError.errors.forEach((err: { field: string; message: string }) => {
                    toast.error(err.message);
                });
            } else {
                // Handle generic errors
                toast.error(customError.message || "Ocurrió un error inesperado");
            }
        },
        onSuccess: () => {
            Swal.fire({
                title: "Account registered Successfully 🎉",
                text: "Now you can login into your account using your entered credentials",
                icon: "success",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            })
            reset();
            router.push("/");
        }
    })

    const handleRegister = (formData: RegisterUserForm) => {
        console.log("📝 Submitting form:", formData.email);
        mutate(formData);
    }

    const password = watch('password');

    return (
        <form 
            className="p-12 bg-white dark:bg-stone-700 rounded-md"
            onSubmit={(e) => {
                // Clear server errors before validation
                clearErrors();
                // Then handle submit normally
                handleSubmit(handleRegister)(e);
            }}
        >
            <h1 className="text-4xl font-bold mb-2">
                Sign Up
            </h1>

            <p className="paragraph">
                Register your account in {" "}
                Ticket {" "} <span className='highlight'>X</span>
            </p>

            <div className="border max-w-68 border-amber-400" />

            <div className="space-y-8 my-4">
                <div className="">
                    <label htmlFor="name">
                        Name 
                    </label>
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Enter your Name"
                        id="name"
                        {...register("name", { required: "Name cannot be empty" })}
                        onChange={(e) => {
                            register("name").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.name?.type === 'server') {
                                clearErrors('name');
                            }
                        }}
                    />
                    {errors.name && <ErrorMessage variant="inline">{errors.name.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <input 
                        className="input" 
                        type="email" 
                        placeholder="Enter your Email Address"
                        id="email"
                        {...register("email", { 
                            required: "Email cannot be empty",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        onChange={(e) => {
                            register("email").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.email?.type === 'server') {
                                clearErrors('email');
                            }
                        }}
                    />
                    {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="input" 
                        type="password" 
                        placeholder="Create a secure Password"
                        id="password"
                        {...register("password", {
                            required: "Password cannot be empty",
                            minLength: {
                                value: 7,
                                message: 'Password must be larger than 7 characters'
                            }
                        })}
                        onChange={(e) => {
                            register("password").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.password?.type === 'server') {
                                clearErrors('password');
                            }
                        }}
                    />
                    {errors.password && <ErrorMessage variant="inline">{errors.password.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input 
                        className="input" 
                        type="password" 
                        placeholder="Rewrite your entered Password"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Repeat password field cannot be empty",
                            validate: value => value === password || "Passwords don't match"
                        })}
                        onChange={(e) => {
                            register("confirmPassword").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.confirmPassword?.type === 'server') {
                                clearErrors('confirmPassword');
                            }
                        }}
                    />
                    {errors.confirmPassword && <ErrorMessage variant="inline">{errors.confirmPassword.message}</ErrorMessage>}
                </div>
            </div>

            <input
                className="bg-amber-400 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber-400 hover:bg-amber-500 transition-colors duration-200"
                type="submit"
                value={isPending ? "Creating account..." : "Sign Up"}
                disabled={isPending}
            />

            {/* Debug info - remove after fixing */}
            <div className="mt-4 text-xs text-gray-500">
                <p>isPending: {isPending.toString()}</p>
                <p>Has errors: {Object.keys(errors).length > 0 ? 'Yes' : 'No'}</p>
            </div>
        </form>
    )
}