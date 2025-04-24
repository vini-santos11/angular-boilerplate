import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { Mail } from 'lucide-angular';
import { CheckboxComponent } from "../../../shared/components/checkbox/checkbox/checkbox.component";

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, CheckboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly Mail = Mail;


    cont : number = 0;


}
