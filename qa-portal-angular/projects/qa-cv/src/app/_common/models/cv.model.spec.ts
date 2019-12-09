import { CvModel } from './cv.model';

describe('Cv', () => {
  it('should create an instance', () => {
    expect(new CvModel()).toBeTruthy();
  });

  it('should build the CV model object', () => {
    const cv: CvModel = new CvModel();

    const testData = {
      id: 'example',
      versionNumber: 1,
      status: 'test status',
      userName: 'joe.bloggs@qa.com',
      cohort: 'example cohort',
      sourceControlLink: 'example-source-control-link.com',
      firstName: 'Joe',
      surname: 'Bloggs',
      fullName: 'Joe Bloggs',
      profile: { profileDetails: 'Example profile details', profileFeedback: [] },
      allSkills: [{
        programmingLanguages: ['programming language skill'],
        ides: ['ide skill'],
        operatingSystems: ['operating system skill'],
        devops: ['devops skill'],
        databases: ['database skill'],
        platforms: ['platform skill'],
        other: ['other skill']
      }],
      hobbies: { hobbiesDetails: 'Example hobbies details', hobbiesFeedback: [] },
      allQualifications: [{ qualificationDetails: 'Example qualification', qualificationFeedback: [] }],
      allWorkExperience: [{
        workExperienceDetails: 'Example work experience', workExperienceFeedback: [], jobTitle: 'Example job title'
      }],
      otherWorkExperience: [{
        workExperienceDetails: 'Example work experience', workExperienceFeedback: [], jobTitle: 'Example job title'
      }]
    };

    for (const k in testData) {
      if (k) {
        cv[k] = testData[k];
      }
    }

    expect(cv.build()).toBeTruthy();
  });
});
