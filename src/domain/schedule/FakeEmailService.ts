import { EmailService } from "./EmailService";

export class FakeEmailService implements EmailService {
    sendMail (to: string, content: string) {
        console.log("Sending mail to " + to + " with content :" + content)
    }
    
}