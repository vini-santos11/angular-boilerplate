import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Mail } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly Mail = Mail;
}
