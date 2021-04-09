import {IsString , IsNumber} from 'class-validator';


export class VacationDto {
    @IsString()
    public period : string;
    @IsString()
    public startDate : string;
    @IsString()
    public endDate : string;
    @IsString()
    public status : string;
}