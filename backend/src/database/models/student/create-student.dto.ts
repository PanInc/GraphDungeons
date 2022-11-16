import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateStudentDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^PC-(?=\d{0,3}[1-9])\d{7}$/)
    professor_code: string;

    @IsString()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
    password: string;
}