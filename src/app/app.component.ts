import { Component } from '@angular/core';
import { ButtonComponent } from '../components/button/button.component';
import { InputComponent } from "../components/input/input.component";

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'boilerplate';
}
