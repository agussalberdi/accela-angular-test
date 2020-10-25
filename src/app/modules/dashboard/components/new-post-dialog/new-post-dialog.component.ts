import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '@core/services/users.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.scss']
})
export class NewPostDialogComponent implements OnInit {
  newPostForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewPostDialogComponent>,
    private fb: FormBuilder,
    private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.user.subscribe((user: User) => this.initForm(user.id));
  }

  private initForm(userId: number): void {
    this.newPostForm = this.fb.group({
      userId: [userId, Validators.required],
      title: ['', [Validators.required, Validators.minLength(6)]],
      body: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  onSubmit(): void {
    const newPost = this.newPostForm.value;
    this.dialogRef.close(newPost);
  }

  get formTitle(): AbstractControl {
    return this.newPostForm.get('title');
  }

  get formBody(): AbstractControl {
    return this.newPostForm.get('body');
  }
}
