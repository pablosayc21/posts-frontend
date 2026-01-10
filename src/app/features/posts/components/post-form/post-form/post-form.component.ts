import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Post } from '../../../models/post.interface';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit, OnChanges {

  @Input() post: Post | null = null;
  @Input() isSubmitting = false;

  @Output() submitForm = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  initForm() {
    this.form = this.fb.group({
      author: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.post && this.form) {
      this.form.patchValue(this.post);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit({...this.form.value} as Post);
  }

  returnToList(){

  }

  goToCreatePost() {
    this.router.navigate(['']);
  }

}
