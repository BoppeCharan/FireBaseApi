import { IsString } from 'class-validator';


export class VacationDto {
    @IsString()
    public period: string;
    @IsString()
    public startDate: string;
    @IsString()
    public endDate: string;
    @IsString()
    public reason : string;
    @IsString()
    public status: string;
}