import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '@core/services/users.service';
import { User } from '@shared/interfaces/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.user$ = this.usersService.user;
  }
}
