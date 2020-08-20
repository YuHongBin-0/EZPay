import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminName: string = "anonymous";

  constructor(public router: Router) { }

  openManageWithState() {
  }

  ngOnInit() {
  }

  manageStudents() {
    this.router.navigate(['/manage']);
  }

  manageVendors() {
    this.router.navigate(['/manage-vendor']);
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
