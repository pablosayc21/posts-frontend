import { Component, signal } from '@angular/core';
import { PostComponent } from '../../../components/post/post.component';
import { PostsService } from '../../../services/posts.service';
import { PageLoaderComponent } from '../../../../../shared/components/page-loader/page-loader/page-loader.component';
import { Post } from '../../../models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { CommentService } from '../../../../comments/services/comment.service';
import { PostComment } from '../../../../comments/models/comment.interface';
import { CommentComponent } from '../../../../comments/components/comment/comment.component';
import { CommentFormComponent } from "../../../../comments/components/comment-form/comment-form.component";
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-post-comments',
  imports: [PostComponent, PageLoaderComponent, CommentComponent, CommentFormComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss'
})
export class PostCommentsComponent {

  post = signal<Post | null>(null);
  comments = signal<PostComment[]>([]);
  loading = signal(true);
  loaded = signal(false);
  isSubmitting = signal(false);
  resetForm = signal(false);
  deletingComment = signal(false);

  private postId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private commentsService: CommentService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData() {
    this.loading.set(true);

    forkJoin({
      post: this.postsService.getPostById(this.postId),
      comments: this.commentsService.getByPostId(this.postId)
    }).subscribe({
      next: ({ post, comments }) => {
        this.post.set(post);
        this.comments.set(comments);
        this.loaded.set(true);
      },
      error: error => {
        this.notificationService.error("Error al cargar comentarios.")
        this.router.navigate(['']);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  createComment(comment: PostComment) {
    this.isSubmitting.set(true);
    this.commentsService.createPost(comment).pipe(finalize(() => { this.isSubmitting.set(false) })).subscribe({
      next: () => {
        this.notificationService.success("Comentario agregado.")
        this.comments().push(comment);
        this.resetForm.set(true);
        setTimeout(() => this.resetForm.set(false));
      },
      error: () => {
        this.notificationService.success("Error al agregar comentario.")
      }
    });
  }

  deleteComment(commentId: string) {
    this.deletingComment.set(true);
    this.commentsService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments.set(this.comments().filter(comment => comment._id !== commentId));
        this.notificationService.success("Comentario eliminado.")
      },
      error: () => {
        this.notificationService.error("Error al crear comentario.")
      },
      complete: () => {
        this.deletingComment.set(false);
      }
    });
  }

}

