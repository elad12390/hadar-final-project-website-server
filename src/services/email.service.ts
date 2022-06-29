import {applicantCollection, IApplicant} from "../dto/Applicant";
import _ from "lodash";


export class EmailService {
    public async createEmailApplicant(email: string) {
        await applicantCollection.push({email})
        console.log('added applicant')
    }

    async getUniqueEmailApplicants() {
        const applicants = await applicantCollection.get<IApplicant[]>();
        return _.uniq(Object.values(applicants).map(applicant => applicant.email))
    }
}


export const emailService = new EmailService();