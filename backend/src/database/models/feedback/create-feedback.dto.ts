import { IsString, IsUUID } from "class-validator";

export class CreateFeedbackDto {
    @IsString()
    message: string

    @IsUUID()
    @IsString()
    dungeonId: string
}