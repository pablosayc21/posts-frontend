import { Component, computed, OnInit, signal } from '@angular/core';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-posts-list',
  imports: [CommonModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts = signal<Post[]>([]);
  loading = signal<boolean>(true);

  constructor(){}

  ngOnInit(): void {
      
  }

  private loadData(){
    this.loading.set(true);
    setTimeout(() => {
      this.posts.set([
        {
          _id: '1',
          title: 'Primer Post',
          body: 'Contenido del primer post de prueba',
          author: 'Juan Pérez',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        {
          _id: '2',
          title: 'Angular Signals',
          body: 'Aprendiendo signals en Angular 18',
          author: 'María López',
          createdAt: '2024-01-02',
          updatedAt: '2024-01-02',
        },
        {
          _id: '3',
          title: 'NestJS + MongoDB',
          body: 'Backend limpio con NestJS',
          author: 'Carlos Gómez',
          createdAt: '2024-01-03',
          updatedAt: '2024-01-03',
        }
      ]);

      this.loading.set(false);
    }, 500);
    this.loading.set(false);
  }

}
