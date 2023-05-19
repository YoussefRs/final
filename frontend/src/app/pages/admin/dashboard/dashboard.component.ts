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
import { ProcedureApi } from 'src/app/API/procedure.api';



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

  // Envoyer une rêquette au serveur chaque 4s pour vérifier si il y a une nouvelle notification
  constructor(private procedureApi : ProcedureApi, private toastr: ToastrService, private authApi: AuthApi, private router: Router, private userService : UserService ) {
    this.notifications$ = timer(0, 4000).pipe(switchMap(() => this.procedureApi.getAllNotifications()));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  // Pour mettre à ajour le compteur des notification
  updateNotificationCount(): void {
    this.notificationCount = this.notifications.length;
  }

  // lors de l'initialisation de la page :
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    // Récuperer le nom de l'utilisateur connecté
    this.userService.getUser().subscribe((user: any) => {
      console.log(user)
      this.username = user
      
    });

    // mettere à ajour le compteur des notification + mettre les récentes notification on top
    this.notifications$.pipe(take(1)).subscribe((initialNotifications) => {
      this.notifications = initialNotifications.reverse();
      this.updateNotificationCount(); 
    });
    
    // filtrer les nouvelle notifications
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

  // Se déconnecter
  logOut() {
    this.authApi.logout().subscribe((response: any) => {
      this.router.navigate(['login']);
          return response;
    });
  }
}