import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { MessageService } from '../services/message.service';
import { Message } from './message';
import { MessageType } from './message-type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private messenger: MessageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.messenger.receive().subscribe((message) => {
      if (message && message.value) {
        this.snackBar.open(message.value, null, {
          duration: 2000,
          panelClass: this.getClasses(message),
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private getClasses(message: Message): string[] {
    let classes: string[] = [];

    classes.push('mat-toolbar');

    switch (message.type) {
      case MessageType.Error:
        classes.push('mat-warn');
        break;
      case MessageType.Warning:
        classes.push('mat-accent');
        break;
      default:
        classes.push('mat-primary');
        break;
    }

    return classes;
  }
}
