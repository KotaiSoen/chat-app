import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOnegroupComponent } from './sidenav-onegroup.component';

describe('SidenavOnegroupComponent', () => {
  let component: SidenavOnegroupComponent;
  let fixture: ComponentFixture<SidenavOnegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavOnegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavOnegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
