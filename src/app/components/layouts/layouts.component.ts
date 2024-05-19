import { Component } from '@angular/core';
import { HeaderComponent } from '../../pages/header/header.component';
import { FooterComponent } from '../../pages/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {}
