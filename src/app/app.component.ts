import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { InputComponent } from "../shared/components/input/input.component";
import { LucideAngularModule, LockKeyhole, Mail, Phone, User, Signature } from 'lucide-angular';
import { SwitchComponent } from '../shared/components/switch/switch.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, InputComponent, SwitchComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'boilerplate';

  readonly LockKeyhole = LockKeyhole;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly User = User;
  readonly Signature = Signature;
}