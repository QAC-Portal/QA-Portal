import { IFeedback } from "./IFeedback.model";

export interface IWorkExperience {
    jobTitle: string;
    start: string;
    end: string;
    workExperienceDetails: string;
    workExperienceFeedback: IFeedback[];
}