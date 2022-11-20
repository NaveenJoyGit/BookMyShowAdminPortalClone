import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  constructor(private readonly route: Router) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    this.route.navigateByUrl('');
  }

}
