import {Body, Controller, Get, Post, Route} from "tsoa";
import {EmailService} from "../services/email.service";

@Route('email')
export class EmailController extends Controller {
    private emailService: EmailService = new EmailService();

    @Post()
    public async postEmailAddress(@Body() req: {email:string}) {
        await this.emailService.createEmailApplicant(req.email);
    }

    @Get()
    public async getEmailAddress() {
        return await this.emailService.getUniqueEmailApplicants();
    }
}