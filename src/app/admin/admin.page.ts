import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminName: string = "anonymous";
  sendCheckRole: string;

  constructor(public router: Router) { }

  openManageWithState() {
    let navigationExtras: NavigationExtras = {
      state: {
        checkRole : this.sendCheckRole
      }
    };
    this.router.navigate(['manage'], navigationExtras);
  }

  ngOnInit() {
  }

  manageStudents() {
    // this.router.navigate(['/manage']);
    this.sendCheckRole = 'student';
    this.openManageWithState();
  }

  manageVendors() {
    // this.router.navigate(['/manage']);
    this.sendCheckRole = 'vendor';
    this.openManageWithState();
  }

  createAccount() {
    this.router.navigate(['/pages']);
  }

  adminHistory() {
    this.router.navigate(['adm-history']);
  }
  adminReports() {
    this.router.navigate(['viewreport']);
  }
}
