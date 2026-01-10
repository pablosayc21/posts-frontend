import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Post } from '../../../models/post.interface';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { getFormError } from '../../../../../shared/utils/form-error.helper';


@Component({
  selector: 'app-post-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnChanges {

  @Input() post: Post | null = null;
  @Input() isSubmitting = false;

  @Output() submitForm = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  getFormError = getFormError;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      author: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post']) {
      this.form.patchValue(changes['post'].currentValue);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit({ ...this.form.value } as Post);
  }

  returnToList() {

  }

  goToCreatePost() {
    this.router.navigate(['']);
  }

}
