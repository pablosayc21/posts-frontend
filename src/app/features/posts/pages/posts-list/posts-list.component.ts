import { Component, computed, OnInit, signal } from '@angular/core';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../components/post/post.component';
import { HeaderComponent } from "../../../../shared/components/header/header.component";

@Component({
  selector: 'app-posts-list',
  imports: [CommonModule, PostComponent, HeaderComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts = signal<Post[]>([]);
  loading = signal<boolean>(true);
  loaded = signal<boolean>(false);

  constructor(){}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
    this.loading.set(true);
    this.loaded.set(false);
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
      ],
    );
    
    this.loading.set(false);
    }, 500);
    this.loading.set(false);
    this.loaded.set(true);
  }

  colorPost(index: number) {
    const colors = ['teal', 'green', 'yellow'];
    return colors[index % colors.length];
  }

}
