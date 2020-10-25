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

  async handleLogin(email: string) {
    await this.usersService.getUser(email).subscribe(value => {
      if (value !== undefined) {
        this.usersService.login(value);
      } else {
        this.openSnackBar('The email address is not valid. Try again!');
      }
    });
    this.router.navigate(['/dashboard']);
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'bottom'
    });
  }
}
