import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Toast {
  id?: number;
  message: string;
  variant: 'success' | 'danger' | 'info' | 'warning';
  duration?: number;
  class?: string;
  exiting?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private counter = 0;

  show(toast: Toast) {
    toast.duration = toast.duration || 4000;
    const id = ++this.counter;
    toast.id = id;
    toast.exiting = false;

    let current = this.toastsSubject.getValue();

    if (current.length >= 4) {
      const firstToast = current[0];
      this.dismiss(firstToast.id!);
      current = this.toastsSubject.getValue();
    }

    this.toastsSubject.next([...current, toast]);

    setTimeout(() => {
      this.dismiss(id);
    }, toast.duration);
  }

  dismiss(id: number) {
    const current = this.toastsSubject.getValue();
    const toast = current.find(t => t.id === id);
    if (!toast) return;

    toast.exiting = true;
    this.toastsSubject.next([...current]);

    setTimeout(() => {
      const updated = this.toastsSubject.getValue().filter(t => t.id !== id);
      this.toastsSubject.next(updated);
    }, 300);
  }

  clearAll() {
    this.toastsSubject.next([]);
  }
}
