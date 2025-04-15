import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { InputComponent } from "../shared/components/input/input.component";
import { LucideAngularModule, LockKeyhole, Mail } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, InputComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'boilerplate';

  readonly LockKeyhole = LockKeyhole;
  readonly Mail = Mail;
}