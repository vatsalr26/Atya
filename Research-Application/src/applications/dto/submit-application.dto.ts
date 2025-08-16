import { IsString, IsOptional, IsJSON, IsNotEmpty } from 'class-validator';

export class SubmitApplicationDto {
    @IsString()
    @IsNotEmpty()
    openCallId: string;

    @IsString()
    @IsNotEmpty()
    submittedProposalId: string;

    @IsString()
    @IsOptional()
    submittedCoverLetter?: string;

    @IsJSON()
    @IsOptional()
    customApplicationAnswers?: string;
}