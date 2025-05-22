import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toast, ToastService } from '../toast.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast.component';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent implements OnInit, OnDestroy {

  toasts: Toast[] = [];
  private sub!: Subscription;

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.sub = this.toast.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  dismiss(id?: number) {
    this.toast.dismiss(id!);
  }
}
