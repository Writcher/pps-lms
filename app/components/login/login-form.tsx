"use client"

import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormData, loginFormProps } from "@/app/lib/dtos/user";
import { useMutation } from "@tanstack/react-query";
import { doCredentialLogin } from "@/app/services/login/login.service";
import CircularProgress from "@mui/material/CircularProgress";

interface APIErrors {
    email?: string,
    password?: string,
    other?: string
};

export default function LoginForm({ admin, guest, scholar }: loginFormProps ) {
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>();
    const router = useRouter();
    const [apiError, setApiError] = useState<APIErrors>({});
    const mutation = useMutation({
        mutationFn: (data: loginFormData) => doCredentialLogin(data),
        onSuccess: (result) => {
            if (result && result.success) {
                switch (result.usertype_id) {
                    case scholar:
                        router.push("/scholar/dashboard");
                        break;
                    case admin:
                        router.push("/admin/projects");
                        break;
                    case guest:
                        router.push("/guest/dashboard");
                };
            } else if (result) {
                if (result.apiError) {
                    setApiError(result.apiError);
                };
            };
        },
        onError: (error: APIErrors) => {
            setApiError({ email: error.email, other: error.other });
        },
    });
    const onSubmit: SubmitHandler<loginFormData> = (data) => {
        mutation.mutate(data);
    };
    return (
        <div className="flex flex-col w-64 md:w-2/5 gap-12">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <TextField 
                        id="email" 
                        label="Email" 
                        type="text" 
                        variant="outlined" 
                        color="warning" 
                        fullWidth
                        {...register("email", { 
                            pattern: 
                                {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Ingrese un email válido"
                            }
                        })}
                        error={!!errors.email || !!apiError.email}
                        helperText={errors.email ? errors.email.message : apiError.email ? apiError.email : "Ingrese su Email"}
                    />
                </div>
                <div className="flex flex-col items-center mb-6 gap-4">
                    <TextField 
                        id="password" 
                        label="Contraseña" 
                        type="password" 
                        variant="outlined" 
                        color="warning" 
                        fullWidth
                        {...register("password")}
                        error={!!apiError.password}
                        helperText={apiError.password ? apiError.password : "Ingrese su Contraseña"}
                    />
                </div>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="warning" 
                    disableElevation
                    endIcon={mutation.isPending ? <CircularProgress color="warning" size={26}/> : <LoginIcon />} 
                    fullWidth 
                    type="submit"
                    disabled={mutation.isPending}
                >
                    INICIAR SESIÓN
                </Button>
            </form>
            {apiError.other && <Alert severity="error">{apiError.other}</Alert>}
        </div>
    );
};