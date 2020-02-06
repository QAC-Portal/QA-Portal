import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { GenerateCvComponent } from './generate-cv.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatChipsModule, MatButtonModule, MatIconModule, MatChipInputEvent, MatProgressSpinnerModule } from '@angular/material';
import { QualificationsComponent } from '../controls/qualifications/qualifications.component';
import { WorkExperienceComponent } from '../controls/work-experience/work-experience.component';
import { CvService } from '../_common/services/cv.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

class MockCvService {
  displayCvPdf(cv) {
    return of(true);
  }
}

describe('GenerateCvComponent', () => {
  let component: GenerateCvComponent;
  let cvService: CvService;
  let fixture: ComponentFixture<GenerateCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GenerateCvComponent,
        MockComponent(QualificationsComponent),
        MockComponent(WorkExperienceComponent)
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: CvService, useClass: MockCvService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCvComponent);
    cvService = TestBed.get(CvService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add relevant skill when called and clear the input', () => {
    const testInputEl = { value: 'test skill', input: { value: 'test skill' } };
    component.cvForm.patchValue({ skills: { other: ['another skill'] } });
    fixture.detectChanges();
    component.addSkill('other', testInputEl as MatChipInputEvent);
    fixture.detectChanges();
    expect(testInputEl.input.value).toEqual('');
    expect(component.cvForm.value.skills.other).toEqual(['another skill', 'test skill']);
  });

  it('should do nothing if called and no value provided', () => {
    const testInputEl = { value: '', input: { value: 'test skill' } };
    component.cvForm.patchValue({ skills: { other: ['another skill'] } });
    fixture.detectChanges();
    component.addSkill('other', testInputEl as MatChipInputEvent);
    fixture.detectChanges();
    expect(testInputEl.input.value).toEqual('');
    expect(component.cvForm.value.skills.other).toEqual(['another skill']);
  });

  it('should remove the provided skill', () => {
    component.cvForm.patchValue({ skills: { other: ['test skill', 'another skill'] } });
    fixture.detectChanges();
    component.removeSkill('other', 'test skill');
    fixture.detectChanges();
    expect(component.cvForm.value.skills.other).toEqual(['another skill']);
  });

  it('should generate a CV based on form values', () => {
    const inputForm = {
      firstName: 'Joe',
      surname: 'Bloggs',
      profile: { profileDetails: 'Example profile details' },
      skills: {
        programmingLanguages: ['programming language skill'],
        ides: ['ide skill'],
        operatingSystems: ['operating system skill'],
        devops: ['devops skill'],
        databases: ['database skill'],
        platforms: ['platform skill'],
        other: ['other skill']
      },
      hobbies: { hobbiesDetails: 'Example hobbies details' },
      qualifications: [{ qualificationDetails: 'Example qualification' }],
      workExperience: [{
        workExperienceDetails: 'Example work experience', workExperienceFeedback: [],
        start: new Date('2015-01-01'), end: new Date('2010-01-01'), jobTitle: 'Example job title'
      }],
      otherWorkExperience: [{
        workExperienceDetails: 'Example work experience', workExperienceFeedback: [],
        start: new Date('2015-01-01'), end: new Date('2010-01-01'), jobTitle: 'Example job title'
      }]
    };

    spyOn(cvService, 'displayCvPdf').and.callFake((cv) => {
      expect(cv.firstName).toEqual(inputForm.firstName);
      expect(cv.surname).toEqual(inputForm.surname);
      expect(cv.profile.profileDetails).toEqual(inputForm.profile.profileDetails);
      expect({ ...cv.allSkills[0] }).toEqual(inputForm.skills);
      expect(cv.hobbies.hobbiesDetails).toEqual(inputForm.hobbies.hobbiesDetails);
      expect(cv.allQualifications.every(
        (q, i) => q.qualificationDetails === inputForm.qualifications[i].qualificationDetails)).toBeTruthy();
      expect(cv.allWorkExperience.every(
        (q, i) => q.workExperienceDetails === inputForm.workExperience[i].workExperienceDetails)).toBeTruthy();
        expect(cv.otherWorkExperience.every(
          (q, i) => q.workExperienceDetails === inputForm.otherWorkExperience[i].workExperienceDetails)).toBeTruthy();
      return of(true);
    });

    component.cvForm.patchValue(inputForm);
    fixture.detectChanges();

    const generateCvButton = fixture.debugElement.nativeElement.querySelector('button[name=generate-cv-button]');
    generateCvButton.click();

    fixture.detectChanges();
    expect(cvService.displayCvPdf).toHaveBeenCalledTimes(1);
  });
});
