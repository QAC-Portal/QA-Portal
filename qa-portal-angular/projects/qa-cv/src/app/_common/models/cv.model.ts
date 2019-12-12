export class Feedback {
    reviewer: string;
    date: string;
    comment: string;
    resolved: boolean;
}

export class ProfileModel {
    profileDetails: string;
    profileFeedback: Feedback[] = [];
}

export class SkillsModel {
    programmingLanguages: string[] = [];
    ides: string[] = [];
    operatingSystems: string[] = [];
    devops: string[] = [];
    databases: string[] = [];
    platforms: string[] = [];
    other: string[] = [];
}

export class QualificationModel {
    qualificationDetails: string;
    qualificationFeedback: Feedback[]  = [];
}

export class WorkExperienceModel {
    jobTitle: string;
    workExperienceDetails: string;
    workExperienceFeedback: Feedback[]  = [];
}

export class HobbiesModel {
    hobbiesDetails: string;
    hobbiesFeedback: Feedback[]  = [];
}

export class CvModel {
    versionNumber = 1;
    profile: ProfileModel = new ProfileModel();
    allSkills: SkillsModel[] = [new SkillsModel()];
    allQualifications: QualificationModel[] = [];
    allWorkExperience: WorkExperienceModel[] = [];
    otherWorkExperience: WorkExperienceModel[] = [];
    hobbies: HobbiesModel = new HobbiesModel();
    id: string;
    status: string;
    userName: string;
    firstName: string;
    surname: string;
    fullName: string;
    cohort: string;
    sourceControlLink: string;


    /**
     * Sanitizes an input string by removing invalid characters.
     */
    private sanitizeStr(str: string): string {
        return str.replace(/\t/g, '');
    }

    // do we need ot satitize feedback aswell??
    public build(): this {
        this.profile.profileDetails = this.sanitizeStr(this.profile.profileDetails);
        this.hobbies.hobbiesDetails = this.sanitizeStr(this.hobbies.hobbiesDetails);
        this.allWorkExperience.map(wE => ({ ...wE, workExperienceDetails: this.sanitizeStr(wE.workExperienceDetails) }));
        this.otherWorkExperience.map(wE => ({ ...wE, workExperienceDetails: this.sanitizeStr(wE.workExperienceDetails) }));
        this.allQualifications.map(quali => ({ ...quali, qualificationDetails: this.sanitizeStr(quali.qualificationDetails) }));
        this.sourceControlLink = this.sanitizeStr(this.sourceControlLink);
        this.firstName = this.sanitizeStr(this.firstName);
        this.surname = this.sanitizeStr(this.surname);

        return this;
    }
}
