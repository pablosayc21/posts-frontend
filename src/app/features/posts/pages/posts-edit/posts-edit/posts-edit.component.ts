import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Post } from '../../../models/post.interface';
import { PostsService } from '../../../services/posts.service';
import { PostFormComponent } from '../../../components/post-form/post-form/post-form.component';
import { PageLoaderComponent } from '../../../../../shared/components/page-loader/page-loader/page-loader.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
@Component({
  selector: 'app-posts-edit',
  imports: [PostFormComponent, PageLoaderComponent],
  templateUrl: './posts-edit.component.html',
  styleUrl: './posts-edit.component.scss'
})
export class PostsEditComponent implements OnInit {

  post = signal<Post | null>(null);
  isSubmitting = signal(false);
  loading = signal(false);

  private postId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPost();
  }

  private loadPost() {
    this.loading.set(true);
    this.postsService.getPostById(this.postId).subscribe({
      next: post => {
        this.post.set(post);
        this.loading.set(false);
      } ,
      error: () => {
        this.notificationService.error("Error al cargar post.")
        this.router.navigate(['']);
      } 
    });
  }

  updatePost(updatedData: Post) {
    this.isSubmitting.set(true);
    this.postsService.updatePost(this.postId, updatedData)
      .pipe(
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['']);
          this.notificationService.success("Post actualizado.")
        } ,
        error: () => {
          this.notificationService.error("Error al actualizar post.")
        }
      });
  }

  returnToList() {
    this.router.navigate(['']);
  }

}
