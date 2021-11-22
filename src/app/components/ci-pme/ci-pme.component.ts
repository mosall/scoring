import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ci-pme',
  templateUrl: './ci-pme.component.html',
  styleUrls: ['./ci-pme.component.scss']
})
export class CiPmeComponent implements OnInit {
  user: any = null;
  currentYear = new Date().getFullYear();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        this.user = data;
      }
    );
  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
      this.router.navigate(['/'])
    }
  }

}
