import { Component, computed, OnInit, signal } from '@angular/core';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../components/post/post.component';
import { PostsService } from '../../services/posts.service';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader/page-loader.component';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification.service';
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-posts-list',
  imports: [CommonModule, PostComponent, PageLoaderComponent, SearchBarComponent, PaginatorComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts = signal<Post[]>([]);
  loading = signal<boolean>(true);
  loaded = signal<boolean>(false);
  deletingPost = signal<boolean>(false);
  filteredPosts = signal<Post[]>([]);
  currentPage = signal<number>(1);

  constructor(
    private postService: PostsService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.loaded.set(false);
    this.postService.getPosts().pipe(
      tap(() => {
        this.loaded.set(true);
      }),
      catchError(() => {
        this.posts.set([]);
        this.loaded.set(true);
        this.notificationService.error("Error al cargar posts.")
        return [];
      })
    )
      .subscribe(posts => {
        this.posts.set(posts);
        this.filteredPosts.set(posts);
        this.loading.set(false);
      });
  }

  deletePost(postId: string) {
    this.deletingPost.set(true);
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.filteredPosts.set(this.posts().filter(post => post._id !== postId));
        this.posts.set(this.posts().filter(post => post._id !== postId));
        this.notificationService.success("Se eliminó el post.")
      },
      error: error => {
        this.notificationService.error(error)
      },
      complete: () => {
        this.deletingPost.set(false);
      }
    });
  }

  updatePost(postId: string){
    this.router.navigate(['posts', 'edit', postId])
  }

  colorPost(index: number) {
    const colors = ['teal', 'green', 'yellow'];
    return colors[index % colors.length];
  }

  goToComments(postId: string){
    this.router.navigate(['posts', 'comments', postId])
  }


  searchPost(title: string | null) {
    if(!title) {
      this.filteredPosts.set(this.posts());
    } else {
      this.filteredPosts.set(this.posts().filter(p => p.title.toLowerCase().includes(title.toLowerCase())));
    }
  }

}
