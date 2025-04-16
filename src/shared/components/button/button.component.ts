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
  @Input() color : 'primary' | 'secondary' = 'primary';
  @Input() size : 'small' | 'medium' | 'large' | 'full' = 'medium';
  @Input() variant : 'filled' | 'outlined' = 'filled';


  @Input() icon?: string; 
  @Input() iconPosition: 'left' | 'right' = 'left';
  




  get buttonStyle() : string {

    if(this.variant === 'filled') {

      if(this.color === 'primary') return 'bg-primary text-white hover:bg-primary-dark';
      if(this.color === 'secondary') return 'bg-secondary text-white hover:bg-secondary-dark';
    }

    if(this.variant === 'outlined') {

      if(this.color === 'primary') return 'bg-transparent border border-primary text-primary hover:bg-primary-light text-black';
      if(this.color === 'secondary') return 'bg-transparent border border-secondary text-secondary hover:bg-secondary-light text-black';
    }


    return 'bg-primary text-white hover:bg-primary-dark';


  }


  get buttonSize() : string {
    switch (this.size) {
      case 'small':
        return 'px-2 py-1 text-sm ';
      case 'medium':
        return 'px-4 py-2 text-base ';
      case 'large':
        return 'px-6 py-3 text-lg ';
      case 'full':
        return 'w-full px-4 py-2 text-lg ';
      default:
        return 'px-4 py-2 text-base ';
    }
  }










}


