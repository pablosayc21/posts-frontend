import { Directive, AfterViewInit, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[PostInput]'
})
export class PostDirective {

  private formControl?: AbstractControl | null = null;

  constructor(
    private ref: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {

  }

  ngAfterViewInit(): void {
    this.formControl = this.control.control;
    if (this.formControl) {
      this.validateInput();
      this.formControl.statusChanges.pipe().subscribe(res => {
        this.validateInput();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formControl) this.validateInput();
  }

  validateInput() {
    if (this.formControl?.invalid) {
      this.renderer.addClass(this.ref.nativeElement, 'border-b-1');
      this.renderer.addClass(this.ref.nativeElement, 'border-pink-600');
      this.renderer.removeClass(this.ref.nativeElement, 'border');
      this.renderer.removeClass(this.ref.nativeElement, 'border-1');
    } else {
      this.renderer.removeClass(this.ref.nativeElement, 'border-b-1');
      this.renderer.removeClass(this.ref.nativeElement, 'border-pink-600');
    }
  }

}
