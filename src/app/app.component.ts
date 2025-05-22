import { Mail } from 'lucide-angular';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastContainerComponent } from "../shared/components/toast/toast-container/toast-container.component";
@Component({
  selector: 'app-root',
  imports: [RouterModule, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
