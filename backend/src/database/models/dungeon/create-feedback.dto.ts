import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDungeonDto {
    @IsString()
    @IsNotEmpty()
    content: string

    @IsUUID()
    @IsString()
    ownerId: string
}