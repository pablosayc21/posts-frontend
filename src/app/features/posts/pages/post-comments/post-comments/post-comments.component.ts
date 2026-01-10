import { Component, signal } from '@angular/core';
import { PostComponent } from '../../../components/post/post.component';
import { PostsService } from '../../../services/posts.service';
import { PageLoaderComponent } from '../../../../../shared/components/page-loader/page-loader/page-loader.component';
import { Post } from '../../../models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommentService } from '../../../../comments/services/comment.service';
import { PostComment } from '../../../../comments/models/comment.interface';
import { CommentComponent } from '../../../../comments/components/comment/comment.component';

@Component({
  selector: 'app-post-comments',
  imports: [PostComponent, PageLoaderComponent, CommentComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss'
})
export class PostCommentsComponent {

  post = signal<Post | null>(null);
  comments = signal<PostComment[]>([]);
  loading = signal(true);
  loaded = signal(false);

  private postId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private commentsService: CommentService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData(){
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
        console.log("Error")
        console.log(error)
        this.router.navigate(['']);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

}
