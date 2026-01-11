import { Component, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  value: string | null = null;
  @Output() searchValue = new EventEmitter<string | null>();

  emitSearchValue(){
    this.searchValue.emit(this.value)
  }

}
