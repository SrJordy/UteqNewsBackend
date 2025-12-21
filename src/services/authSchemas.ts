// Este archivo definirá los tipos de entrada para la validación.

export interface RegisterUserInput {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol?: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface UpdateUserInput {
    nombre?: string;
    apellido?: string;
    password?: string;
}

export interface PreferenceInput {
    email: string;
    careerName: string;
}

export interface FilteredContentInput {
    email: string;
}

export interface RequestPasswordResetInput {
    email: string;
}

export interface ResetPasswordInput {
    email: string;
    token: string;
    newPassword: string;
}