import { IFeedback } from "./iFeedback.model";

export interface IProfile {
    profileDetails: string;
    profileFeedback: IFeedback[];
}