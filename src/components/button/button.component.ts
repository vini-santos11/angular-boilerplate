import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {


  @Input() text : string = 'Button';
  // @Input() variant : 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size : 'small' | 'medium' | 'large' = 'medium';

  // get buttonClass() : string {

  //   switch (this.variant) {
  //     case 'primary':
  //       return 'bg-primary text-white';
  //     case 'secondary':
  //       return 'bg-secondary text-white';
  //     case 'danger':
  //       return 'bg-error text-white';
  //     default:
  //       return 'bg-black text-white';
  //   }
  // }

  get buttonSize() : string {
    switch (this.size) {
      case 'small':
        return 'px-2 py-1 text-sm rounded-lg';
      case 'medium':
        return 'px-4 py-2 text-base rounded-lg';
      case 'large':
        return 'px-6 py-3 text-lg rounded-lg';
      default:
        return 'px-4 py-2 text-base rounded-lg';
    }
  }






}


