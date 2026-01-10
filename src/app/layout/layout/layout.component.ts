import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { signal } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  showCreateButton = signal(true);

  constructor(private route: ActivatedRoute) {
    this.updateHeaderOptions();
  }

  updateHeaderOptions() {
    this.route.firstChild?.data.subscribe(data => {
      this.showCreateButton.set(data['showCreateButton'] ?? true);
    });
  }

}
