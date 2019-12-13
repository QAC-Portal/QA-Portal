import { TestBed } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';
import { MockQaHttpService } from 'projects/portal-core/src/app/_mocks/qa-http.service.mock';
import { QaHttpService, HttpUrlDefinition } from 'projects/portal-core/src/app/_common/services/qa-http.service';
import { IFormModel } from 'projects/qa-forms/src/app/_common/models';
import { of, Observable } from 'rxjs';

fdescribe('FeedbackService', () => {
    let service: FeedbackService;
    let qaHttp: QaHttpService;
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            { provide: QaHttpService, useClass: MockQaHttpService },
            FeedbackService
        ]
    }));

    beforeEach(() => {
        service = TestBed.get(FeedbackService);
        qaHttp = TestBed.get(QaHttpService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created', () => {
        expect(qaHttp).toBeTruthy();
    });

    it('should get a form by course Id', done => {
        const testCourseId = '12345';
        const testFormModel = { id: 123 } as IFormModel;

        spyOn(qaHttp, "get").and.callFake((arg: HttpUrlDefinition): Observable<any> => {
            expect(arg.params.courseId).toEqual(testCourseId);
            expect(arg.ref).toEqual('GET_FEEDBACK_FOR_COURSE');
            return of(testFormModel);
        });

        service.getForm(testCourseId).subscribe(data => {
            expect(data).toEqual(testFormModel)
            done();
        });
    });

    it('should create a form', done => {
        const testFormModel = { id: 123, cohortCourse: 'course name', trainee: 'trainee name' } as IFormModel;

        spyOn(qaHttp, "post").and.callFake((arg: HttpUrlDefinition, testFormModel: IFormModel): Observable<any> => {
            expect(arg.params.id).toEqual(testFormModel.id);
            expect(arg.params.cohortCourse).toEqual(testFormModel.cohortCourse);
            expect(arg.params.trainee).toEqual(testFormModel.trainee);
            expect(arg.ref).toEqual('CREATE_FEEDBACK_FORM');
            return of(testFormModel);
        });

        service.createForm(testFormModel).subscribe(data => {
            expect(data).toEqual(testFormModel)
            done();
        });
    })
});
