import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { signal } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  
  showCreateButton = signal<boolean>(true);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.listenRouting();
  }

  listenRouting(){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.route.firstChild;
        this.showCreateButton.set(childRoute?.snapshot.data['showCreateButton'] ?? true);
      });
  }

  goToCreatePost() {
    this.router.navigate(['/posts/new']);
  }

  goToList(){
    this.router.navigate([''])
  }

}
