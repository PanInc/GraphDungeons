import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateProfessorDto {
    code: string | null;
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
    password: string;
}