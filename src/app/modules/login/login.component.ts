import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  async handleLogin(email: string) {
    await this.usersService.getUser(email).subscribe(value => {
      if (value !== undefined) {
        this.usersService.login(value);
      }
    });
    this.router.navigate(['/dashboard']);
  }
}
