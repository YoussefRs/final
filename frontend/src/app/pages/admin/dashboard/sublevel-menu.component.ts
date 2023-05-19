import { Component, Input } from '@angular/core';
import { INavbarData } from '../helper';
import { animate, state, style, transition, trigger } from '@angular/animations';


// Fonctionalité du sidebar 
@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.list && data.list.length > 0"
      [@submenu] = "expanded 
        ? 
        {value: 'visible',
           params: {transitionParams: '400ms cubic-bezier(0.86, 0 , 0.07,1)',
            height: '*'}} 
        : { value : 'hidden', params: { transitionParams: '400ms cubic-bezier(0.86, 0 , 0.07,1)',
            height: '0'}}" 
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.list" class="sublevel-nav-item">
        <a class="sublevel-nav-link"
          (click)="handleClick(item)"
          *ngIf="item.list && item.list.length > 0"
          >
            <i class="sublevel-link-icon fa fa-circle"></i>
            <span class="sublevel-link-text" *ngIf="collapsed">{{item.Label}}</span>
            <i *ngIf="item.list && collapsed" class="menu-collapse-icon"
              [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"]
            ></i>
        </a>
        <a class="sublevel-nav-link" *ngIf="!item.list || (item.list && item.list.length ===0)"
          [routerLink]="[item.routerLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{exact : true}"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" *ngIf="collapsed">{{item.Label}}</span>
        </a>
        <div *ngIf="item.list && item.list.length > 0">
          <app-sublevel-menu
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          >
        </app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./dashboard.component.css'],
  animations : [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height : '*'
      })),
      transition('visible <=> hidden', [style({overflow : 'hidden'}),
    animate('{{transitionParams}}')]),
    transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent {
  @Input() data: INavbarData = {
    routerLink: '',
    icon : '',
    Label : '',
    list: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  handleClick(item: any): void {
    if (!this.multiple) {
      if(this.data.list && this.data.list.length <0) {
        for (let modeLItem of this.data.list) {
          if (item !== modeLItem && modeLItem.expanded) {
            modeLItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
