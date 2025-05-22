import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastContainerComponent } from "../shared/components/toast/toast-container/toast-container.component";
import { TooltipComponent } from "../shared/components/tooltip/tooltip.component";
@Component({
  selector: 'app-root',
  imports: [RouterModule, ToastContainerComponent, TooltipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
