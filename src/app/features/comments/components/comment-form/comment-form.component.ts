import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostComment } from '../../models/comment.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent implements OnChanges {

  @Input() postId!: string;
  @Input() isSubmitting = false;
  @Output() submitForm = new EventEmitter<PostComment>();
  @Input() resetOnSuccess = false;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      postId: [this.postId, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.required]],
      body: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.resetOnSuccess && this.form) {
      this.form.reset({
        postId: this.postId
      });
    }

    if (changes['postId']) {
      this.form.patchValue({ postId: this.postId });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.value as PostComment);
  }

  log(){
    console.log(this.form.getRawValue())
  }

}
