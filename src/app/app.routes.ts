import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => 
            import('./features/posts/pages/posts-list/posts-list.component').then(m => m.PostsListComponent)
    }
];
