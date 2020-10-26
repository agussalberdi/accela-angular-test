import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { NewPostDialogComponent } from './new-post-dialog.component';
import { UsersService } from '@core/services/users.service';

describe('NewPostDialogComponent', () => {
  let component: NewPostDialogComponent;
  let fixture: ComponentFixture<NewPostDialogComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostDialogComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, MatDialogModule ],
      providers: [
        UsersService,
        { provide: MatDialogRef, useValue: {} },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostDialogComponent);
    component = fixture.componentInstance;
    component.newPostForm = formBuilder.group({
      userId: [1, Validators.required],
      title: ['title', [Validators.required, Validators.minLength(6)]],
      body: ['body', [Validators.required, Validators.maxLength(150)]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
