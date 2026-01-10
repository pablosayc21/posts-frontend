import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../../../components/post-form/post-form/post-form.component';
import { Post } from '../../../models/post.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts-create',
  imports: [CommonModule, PostFormComponent],
  templateUrl: './posts-create.component.html',
  styleUrl: './posts-create.component.scss'
})
export class PostsCreateComponent {

  constructor(private router: Router){}

  isSubmitting = false;

  createPost(post: Post) {
    this.isSubmitting = true;
    setTimeout(() => {
      console.log('POST CREATED:', post);
      this.isSubmitting = false;
    }, 1000);
  }

  returnToList(){
    this.router.navigate(['']);
  }

}
