import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/posts/pages/posts-list/posts-list.component')
                        .then(m => m.PostsListComponent),
            }
        ],
    },
];
