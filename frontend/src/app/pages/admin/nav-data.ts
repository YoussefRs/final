import { INavbarData } from "./helper";

export const sidebarData: INavbarData[] = [
   
    {
        routerLink: 'procédures',
        icon: 'fal fa-file',
        Label: 'Espace admin',
        list: [
            {
                routerLink: 'utilisateur',
                Label : 'Gestion des utlisateurs'
             },
            {
                routerLink: 'procedure/liste',
                Label : 'Gestion des procédures'
            },
            {
                routerLink: 'procedure/gestion',
                Label : 'Rapports'
            },
           
            {
                routerLink: 'procedure/stats',
                Label : 'Statistiques'
            },
           
        ]
    }
]