import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink, 
    RouterLinkActive   // ✅ Add this so routerLink, routerLinkActive work
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'VISHNU PRIYA P';

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  isActive(route: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl === `/${route}` || 
           (route === 'home' && (currentUrl === '/' || currentUrl === ''));
  }
}
