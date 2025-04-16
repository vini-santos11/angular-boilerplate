import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LockKeyhole, LucideAngularModule, Mail, Phone, Signature, User, Wifi } from 'lucide-angular';
import { SwitchComponent } from '../../../../shared/components/switch/switch.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-mv',
  imports: [ButtonComponent, InputComponent, SwitchComponent, LucideAngularModule, ReactiveFormsModule, RouterModule],
  templateUrl: './mv.component.html',
  styleUrl: './mv.component.css'
})
export class MvComponent {
  public form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    document: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    active: new FormControl(false),
  });

  readonly LockKeyhole = LockKeyhole;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly User = User;
  readonly Signature = Signature;
  readonly Wifi=Wifi;
}
