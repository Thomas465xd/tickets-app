import { isAxiosError } from "axios";
import { getUserSchema, LoginUserForm, RegisterUserForm } from "../types";
import api from "@/lib/axios";

interface ValidationError {
    message: string;
    field: string;
}

interface ApiErrorResponse {
    errors?: ValidationError[];
    message?: string;
    error?: string;
}

export async function createAccount(formData: RegisterUserForm) {
    try {
        const url = "/api/auth/register";
        const response = await api.post(url, formData);
        return response.data;                   
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Respuesta completa:", error.response?.data);

            const responseData: ApiErrorResponse = error.response?.data;

            // If API returns structured validation errors
            if (responseData?.errors && Array.isArray(responseData.errors)) {
                // Throw the structured errors so they can be handled in the component
                throw {
                    type: 'validation',
                    errors: responseData.errors,
                    statusCode: error.response?.status
                };
            }

            // Generic error
            const errorMessage = 
                responseData?.message || 
                responseData?.error || 
                error.message || 
                "Ocurrió un error en la API";

            console.error("➡️ Mensaje de error:", errorMessage);
            throw new Error(errorMessage);

        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente. Si el error persiste, contacta al administrador.");
        }
    }
}

export async function login(formData: LoginUserForm) {
    try {
        const url = "/api/auth/login";
        const response = await api.post(url, formData);
        return response.data;                   
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Respuesta completa:", error.response?.data);

            const responseData: ApiErrorResponse = error.response?.data;

            // If API returns structured validation errors
            if (responseData?.errors && Array.isArray(responseData.errors)) {
                // Throw the structured errors so they can be handled in the component
                throw {
                    type: 'validation',
                    errors: responseData.errors,
                    statusCode: error.response?.status
                };
            }

            // Generic error
            const errorMessage = 
                responseData?.message || 
                responseData?.error || 
                error.message || 
                "Ocurrió un error en la API";

            console.error("➡️ Mensaje de error:", errorMessage);
            throw new Error(errorMessage);

        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente. Si el error persiste, contacta al administrador.");
        }
    }
}


export async function getUser() {
    try {
        const url = "/api/auth/user";
        console.log(url)
        const { data } = await api.get(url);
        console.log(data)

        const response = getUserSchema.safeParse(data);

        if (!response.success) {
            // console.error("❌ Error de validación:", response.error.format());
            // throw new Error("El formato de los datos del usuario no es válido.");
            return null;
        }

        return response.data.currentUser;

    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Respuesta completa:", error.response?.data);

            const responseData: ApiErrorResponse = error.response?.data;

            // If API returns structured validation errors
            if (responseData?.errors && Array.isArray(responseData.errors)) {
                // Throw the structured errors so they can be handled in the component
                throw {
                    type: 'validation',
                    errors: responseData.errors,
                    statusCode: error.response?.status
                };
            }

            // Generic error
            const errorMessage = 
                responseData?.message || 
                responseData?.error || 
                error.message || 
                "Ocurrió un error en la API";

            console.error("➡️ Mensaje de error:", errorMessage);
            throw new Error(errorMessage);

        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente. Si el error persiste, contacta al administrador.");
        }
    }
}
