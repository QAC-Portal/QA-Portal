import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsComponent } from './qualifications.component';
import { MatTableModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { QualificationModel } from '../../_common/models/cv.model';

fdescribe('QualificationsComponent', () => {
  let component: QualificationsComponent;
  let fixture: ComponentFixture<QualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualificationsComponent],
      imports: [
        FormsModule,
        MatTableModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update qualification and inform the formgroup when a user enters details', () => {
    spyOn(component, 'onChange').and.callFake(x => { });
    spyOn(component, 'onTouch').and.callFake(() => { });
    component.qualisTableDataSource.data = [{ qualificationDetails: '', qualificationFeedback: [] }];
    fixture.detectChanges();
    const inputEl = fixture.debugElement.nativeElement.querySelector('input[name=qualification-details-input]');
    inputEl.value = 'test input text';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.onChange).toHaveBeenCalledTimes(1);
    expect(component.onTouch).toHaveBeenCalledTimes(1);
    expect(component.qualisTableDataSource.data[0].qualificationDetails).toEqual('test input text');
  });

  it('should remove a qualification and inform the formgroup when a user clicks the remove button', () => {
    spyOn(component, 'onChange').and.callFake(x => { });
    spyOn(component, 'onTouch').and.callFake(() => { });
    component.qualisTableDataSource.data = [{ qualificationDetails: 'this quali should be removed', qualificationFeedback: [] }];
    fixture.detectChanges();
    const removeButton = fixture.debugElement.nativeElement.querySelector('button[name=remove-qualification-button]');
    removeButton.click();
    fixture.detectChanges();
    expect(component.onChange).toHaveBeenCalledTimes(1);
    expect(component.onTouch).toHaveBeenCalledTimes(1);
    expect(component.qualisTableDataSource.data).toEqual([]);
  });

  describe('ControlValueAccessor methods', () => {
    it('should store the onChange callback when called', () => {
      const spy = jasmine.createSpy('onChangeSpy', (v: QualificationModel[]) => { });
      component.onChange = null;
      (component as any).registerOnChange(spy);
      component.onChange(null);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should store the onTouch callback when called', () => {
      const spy = jasmine.createSpy('onTouchSpy', () => { });
      component.onTouch = null;
      (component as any).registerOnTouched(spy);
      component.onTouch();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should update the interval disabled state of the control', () => {
      component.isDisabled = false;
      component.setDisabledState(true);
      expect(component.isDisabled).toBeTruthy();
    });
    it('should update the internal value of the control', () => {
      const testData = [{ qualificationDetails: 'test data', qualificationFeedback: [] }];
      component.qualisTableDataSource.data = [];
      component.writeValue(testData);
      expect(component.qualisTableDataSource.data).toEqual(testData);
    });
  });

  describe('new qualification button', () => {
    let newQualiButton;

    beforeEach(() => {
      newQualiButton = fixture.debugElement.nativeElement.querySelector('button[name=new-qualification-button]');
    });

    it('should add a new qualification when clicked', async () => {
      spyOn(component, 'onNewQualiClick').and.callThrough();
      expect(component.qualisTableDataSource.data.length).toEqual(0);
      newQualiButton.click();
      await fixture.whenStable();
      expect(component.qualisTableDataSource.data.length).toEqual(1);
    });
    it('should inform the formGroup it has been changed, touched', async () => {
      spyOn(component, 'onChange').and.callFake(v => { });
      spyOn(component, 'onTouch').and.callFake(() => { });
      newQualiButton.click();
      await fixture.whenStable();
      expect(component.onChange).toHaveBeenCalledTimes(1);
      expect(component.onTouch).toHaveBeenCalledTimes(1);
    });
    it('should stop adding new qualifications when 3 are added', () => {
      expect(component.qualisTableDataSource.data.length).toEqual(0);
      for (let i = 0; i < 10; i++) {
        newQualiButton.click();
        fixture.detectChanges();
      }
      expect(component.qualisTableDataSource.data.length).toEqual(3);
    });
  });

  describe('built-in validation', () => {
    // VALID
    it('should return null if value of control is null (no overlap required validator)', () => {
      expect(component.validate({ value: null })).toBeNull();
    });
    it('should return null if value of control is empty array (no overlap required, min validator)', () => {
      expect(component.validate({ value: [] })).toBeNull();
    });
    it('should return null if value of control is one populated qualification', () => {
      expect(component.validate({
        value: [{ qualificationDetails: 'example qualification', qualificationFeedback: [] }]
      })).toBeNull();
    });
    it('should return null if value of control is multiple populated qualifications', () => {
      expect(component.validate({
        value: [
          { qualificationDetails: 'example qualification', qualificationFeedback: [] },
          { qualificationDetails: 'example qualification', qualificationFeedback: [] },
          { qualificationDetails: 'example qualification', qualificationFeedback: [] },
          { qualificationDetails: 'example qualification', qualificationFeedback: [] }
        ]
      })).toBeNull();
    });

    // INVALID
    it('should return error if value of control is one unpopulated qualification', () => {
      expect(component.validate({
        value: [{ qualificationDetails: null, qualificationFeedback: [] }]
      })).not.toBeNull();
    });
    it('should return error if value of control is multiple unpopulated qualifications', () => {
      expect(component.validate({
        value: [
          { qualificationDetails: '', qualificationFeedback: [] },
          { qualificationDetails: null, qualificationFeedback: [] }
        ]
      })).not.toBeNull();
    });
    it('should return error if value has at least one unpopulated qualification', () => {
      expect(component.validate({
        value: [
          { qualificationDetails: 'example qualification', qualificationFeedback: [] },
          { qualificationDetails: '', qualificationFeedback: [] },
          { qualificationDetails: 'example qualification', qualificationFeedback: [] },
          { qualificationDetails: 'example qualification', qualificationFeedback: [] }
        ]
      })).not.toBeNull();
    });

  });
});
