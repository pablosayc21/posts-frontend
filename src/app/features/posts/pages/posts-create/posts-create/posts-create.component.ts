import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../../../components/post-form/post-form/post-form.component';
import { Post } from '../../../models/post.interface';
import { Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { finalize } from 'rxjs';
import { signal } from '@angular/core';
@Component({
  selector: 'app-posts-create',
  imports: [CommonModule, PostFormComponent],
  templateUrl: './posts-create.component.html',
  styleUrl: './posts-create.component.scss'
})
export class PostsCreateComponent {

  isSubmitting = signal<boolean>(false);

  constructor(
    private router: Router,
    private postService: PostsService
  ) { }


  createPost(post: Post) {
    this.isSubmitting.set(true);

    this.postService.createPost(post)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: () => {

          this.router.navigate(['']);
        },
        error: () => {

        }
      });
  }

  returnToList() {
    this.router.navigate(['']);
  }

}
