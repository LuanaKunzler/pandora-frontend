import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotVerificationComponent } from './password-forgot-verification.component';

describe('PasswordForgotVerificationComponent', () => {
  let component: PasswordForgotVerificationComponent;
  let fixture: ComponentFixture<PasswordForgotVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordForgotVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordForgotVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
