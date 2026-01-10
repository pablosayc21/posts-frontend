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
                data: {
                    showCreateButton: true,
                }
            },
            {
                path: 'posts/new',
                loadComponent: () =>
                    import('./features/posts/pages/posts-create/posts-create/posts-create.component')
                        .then(m => m.PostsCreateComponent),
                data: {
                    showCreateButton: false,
                }
            },
            {
                path: 'posts/edit/:id',
                loadComponent: () =>
                    import('./features/posts/pages/posts-edit/posts-edit/posts-edit.component')
                        .then(m => m.PostsEditComponent),
                data: {
                    showCreateButton: false,
                }
            }
        ]
    }

];
