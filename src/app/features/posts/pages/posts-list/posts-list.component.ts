import { Component, computed, OnInit, signal } from '@angular/core';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../components/post/post.component';
import { PostsService } from '../../services/posts.service';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader/page-loader.component';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  imports: [CommonModule, PostComponent, PageLoaderComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts = signal<Post[]>([]);
  loading = signal<boolean>(true);
  loaded = signal<boolean>(false);
  deletingPost = signal<boolean>(false);

  constructor(
    private postService: PostsService,
    private router: Router
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
        return [];
      })
    )
      .subscribe(posts => {
        this.posts.set(posts);
        this.loading.set(false);
      });
  }

  deletePost(postId: string) {
    this.deletingPost.set(true);
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts.set(
          this.posts().filter(post => post._id !== postId)
        );
      },
      error: () => {
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

}
