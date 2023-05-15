import { Component, EventEmitter, HostListener, NgModule, OnInit, Output } from '@angular/core';
import { sidebarData } from '../nav-data';
import { INavbarData } from '../helper';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthApi } from 'src/app/API/auth.api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/API/UserService';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notifications$: Observable<any>;
  notificationCount = 0;
  notifications: any[] = [];
  username: string = '';
  firstNotificationReceived = false;

  @Output() onToggleSideNav = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = sidebarData;
  multiple = false;

  constructor(private http: HttpClient, private toastr: ToastrService, private authApi: AuthApi, private router: Router, private userService : UserService ) {
    this.notifications$ = timer(0, 4000).pipe(switchMap(() => this.http.get('http://localhost:8081/programs/allNotifications')));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  updateNotificationCount(): void {
    this.notificationCount = this.notifications.length;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.userService.getUser().subscribe((user: any) => {
      console.log(user)
      this.username = user
      
    });

    this.notifications$.pipe(take(1)).subscribe((initialNotifications) => {
      // console.log('Initial notifications:', initialNotifications);
      this.notifications = initialNotifications.reverse();
      this.updateNotificationCount(); 
    });
  
    this.notifications$.pipe(
      tap((notifications) => {
        const newNotifications = notifications.filter((notification: any) => !this.notifications.some((n) => n.id === notification.id));
        if (newNotifications.length > 0) {
          this.notifications = newNotifications.concat(this.notifications);
          this.updateNotificationCount();
          this.toastr.success('Vous avez une nouvelle notification!');
        }
      })
    ).subscribe(
      () => {},
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  // toggleCollapse(): void {
  //   this.collapsed = !this.collapsed;
  //   this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
  // }

  handleClick(item: INavbarData): void {
    if (!this.multiple) {
      this.navData.forEach((modeLItem) => {
        if (item !== modeLItem && modeLItem.expanded) {
          modeLItem.expanded = false;
        }
      });
    }
    item.expanded = !item.expanded;
  }

  logOut() {
    this.authApi.logout().subscribe((response: any) => {
      this.router.navigate(['login']);
          return response;
    });
  }
}