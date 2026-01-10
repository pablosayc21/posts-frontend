import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostComment } from '../../models/comment.interface';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {

  @Input() postId!: string;
  @Input() isSubmitting = false;
  @Output() submitForm = new EventEmitter<PostComment>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      postId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      body: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

}
