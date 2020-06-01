import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    hidden : boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' , hidden:false},
    { path: '/master/disabilitas', title: 'Master Disabilitas',  icon:'content_paste', class: '', hidden:false },
    { path: '/master/disabilitas/add', title: 'Add Master Disabilitas',  icon:'content_paste', class: '', hidden:true },
    { path: '/master/disabilitas/edit', title: 'Add Master Disabilitas',  icon:'content_paste', class: '', hidden:true },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '', hidden:false },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '', hidden:false },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '', hidden:false },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '', hidden:false },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '', hidden:false },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '', hidden:false },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro', hidden:false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
