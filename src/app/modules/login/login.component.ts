import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '@core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  handleLogin(email: string): void {
    this.usersService.getUser(email).subscribe(value => {
      if (value !== undefined) {
        this.usersService.login(value);
        this.router.navigate(['/dashboard']);
      } else {
        this.openSnackBar('The email address is not valid. Try again!');
      }
    });
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'bottom'
    });
  }
}
