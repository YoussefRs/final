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
    },
    // {
    //     routerLink: 'procedures',
    //     icon: 'fal fa-users',
    //     Label: 'Utilisateurs',
    //     list: [
    //         {
    //             routerLink: 'utilisateur',
    //             Label : 'Gestion des utlisateurs'
    //         },
    //     ]
    // },
    // {
    //     routerLink: 'procedures',
    //     icon: 'fal fa-history',
    //     Label: 'Historique'
    // },
    
]