import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "../../models/role.enum";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User = new User();
  public errorMessage: string = "";

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    })
  }

  changeRole() {
    const newRole = this.currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;
    this.userService.changeRole(newRole).subscribe(() => {
      this.authenticationService.logOut();
      this.router.navigate(['/login']);
    }, error => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(error);
    });
  }
}
