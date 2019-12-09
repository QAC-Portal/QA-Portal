import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { MatProgressBarModule, MatTableModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { doesNotThrow } from 'assert';

fdescribe('DataTableComponent', () => {
  let component: DataTableComponent<any>;
  let fixture: ComponentFixture<DataTableComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [
        MatProgressBarModule,
        MatTableModule,
        CdkTableModule,
        DragDropModule,
        MatCheckboxModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a rowClick event when called', done => {
    const testIndex = 1;
    const testData = 'test data';
    const testEvent = new MouseEvent('click');
    
    component.rowClick.subscribe(data => {
      expect(data.index).toEqual(testIndex);
      expect(data.data).toEqual(testData);
      expect(data.event).toEqual(testEvent);
      
      done();
    });

    component.onRowClicked(testIndex, testData, testEvent);
  });

  it('should update when a row is selected', () => {
    
  });

  it('should deselect all rows', done => {
    component.rowSelectionChange.subscribe(data => {
      expect(data).toEqual(component.rowSelection);

      done();
    });

    component.deselectAllRows();
  });
});
