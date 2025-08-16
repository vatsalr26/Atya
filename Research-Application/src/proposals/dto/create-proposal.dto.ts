import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreateProposalDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsObject()
    @IsOptional()
    content: any;
}