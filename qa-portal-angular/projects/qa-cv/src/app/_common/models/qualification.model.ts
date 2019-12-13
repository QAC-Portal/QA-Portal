import { IFeedback } from "./iFeedback.model";

export interface IQualification {
    qualificationDetails: string;
    qualificationFeedback: IFeedback[];
}