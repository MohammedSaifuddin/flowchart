import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNodesComponent } from './assign-nodes.component';

describe('AssignNodesComponent', () => {
  let component: AssignNodesComponent;
  let fixture: ComponentFixture<AssignNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
