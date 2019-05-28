import {Component, OnInit, ViewChild, AfterViewInit, OnChanges,HostListener} from '@angular/core';
import {Location, PopStateEvent} from '@angular/common';
import {Router, NavigationEnd, NavigationStart } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , AfterViewInit, OnChanges {
  @HostListener('window:close', ['$event'])
  closeHandler(event) {
    localStorage.clear();
  }
  public authbool = null;
  private lastPoppedUrl: string;
  private socket_alarms: any;
  private yScrollStack: number[] = [];
  public auth = localStorage.getItem('authorize');

  constructor( public location: Location, private router: Router) {}

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini') && this.auth) {
      // if we are on windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });

  }
  ngOnChanges() {
  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  isMaps(path){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if(path == titlee){
      return false;
    }
    else {
      return true;
    }
  }
  runOnRouteChange(): void {
    // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //     const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    //     const ps = new PerfectScrollbar(elemMainPanel);
    //     ps.update();
    // }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

}
