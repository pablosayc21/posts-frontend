import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  private emitPage() {
    this.pageChange.emit(this.currentPage);
  }

  goToFirst() {
    this.currentPage = 1;
    this.emitPage();
  }

  goToPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPage();
    }
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPage();
    }
  }

  goToLast() {
    this.currentPage = this.totalPages;
    this.emitPage();
  }

}
