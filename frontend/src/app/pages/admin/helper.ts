export interface INavbarData {
    routerLink: String;
    icon?: String;
    Label: String;
    expanded?: boolean;
    list?: INavbarData[];
}