import { Feedback } from './cv.model';

export interface IWorkExperience {
    jobTitle: string;
    start: string;
    end: string;
    workExperienceDetails: string;
    workExperienceFeedback: Feedback[];
}