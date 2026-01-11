import { Directive, AfterViewInit, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[CommentInput]'
})
export class CommentDirective implements AfterViewInit, OnChanges {

  private formControl?: AbstractControl | null = null;

  constructor(
    private ref: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) { }

  ngAfterViewInit(): void {
    this.formControl = this.control.control;
    if (this.formControl) {
      this.validateForm();
      this.formControl.statusChanges.pipe().subscribe(res => {
        this.validateForm();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formControl) this.validateForm();
  }

  validateForm() {
    if (this.formControl?.invalid) {
      this.renderer.addClass(this.ref.nativeElement, 'border-red-600');
      this.renderer.addClass(this.ref.nativeElement, 'border-1');
    } else {
      this.renderer.removeClass(this.ref.nativeElement, 'border-red-600');
      this.renderer.removeClass(this.ref.nativeElement, 'border-1');
    }
  }

}
