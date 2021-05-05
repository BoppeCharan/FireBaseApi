import { IsString } from 'class-validator';


export class AttendanceDto {
    @IsString()
    public status: string;
    @IsString()
    public date : string;
    @IsString()
    public workingHrs: string;
    @IsString()
    public loggedInTime : string;
    @IsString()
    public loggedOutTime : string;
}
