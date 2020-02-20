import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedTaskListsViewComponent } from './created-task-lists-view.component';

describe('CreatedTaskListsViewComponent', () => {
  let component: CreatedTaskListsViewComponent;
  let fixture: ComponentFixture<CreatedTaskListsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedTaskListsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedTaskListsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
