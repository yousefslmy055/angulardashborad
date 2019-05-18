import { Component, OnInit } from '@angular/core';
import {PublishersService} from '../../data/publishers.service';
import {LocaleService} from '../../data/locale.service';
import {Router} from '@angular/router';
import {AuthService} from '../../data/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/table-list', title: 'فرم',  icon:'content_paste', class: '' },
    { path: '/maps', title: 'نقشه',  icon:'person', class: '' },
    // { path: '/typography/:id/:uuid', title: 'تست ۳',  icon:'library_books', class: '' },
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  changelocale: string;
  locale: any = {};
  public tipax: boolean = true

  constructor( private localeservice: LocaleService, private router: Router,
               private authservice: AuthService) { }

  ngOnInit() {
      this.getlocale();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  getlocale() {
      this.changelocale =  localStorage.getItem('changelocale');
      console.log(this.changelocale);
      if (this.changelocale == null) {

          this.locale = this.localeservice.getfa();
      }
      if (this.changelocale == 'en') {
          this.locale = this.localeservice.geten();
      }

  }
    onLogOut() {
      this.authservice.onlogout()
          .then((res) => {
              this.router.navigate(['/sign-in']);
          });
    }
}
