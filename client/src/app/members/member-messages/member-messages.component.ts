import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  standalone: true,
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [CommonModule, DateAgoPipe, FormsModule]
})
export class MemberMessagesComponent implements OnInit{
  @ViewChild('MessageForm') messageForm?: NgForm;
 @Input() username?:string;
 messageContent = '';
 loading = false;

  constructor(
    public messageService: MessageService
  ){}

  ngOnInit(): void {
    //this.loadMessages();
  }

  sendMessage(){
    if(!this.username) return;

    this.loading = true;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm?.reset();
    }).finally(() => this.loading = false);
  }

  // loadMessages(){
  //   if(this.username){
  //     this.messageService.getMessageThread(this.username).subscribe({
  //       next: messages => {
  //         this.messages = messages;
  //       }
  //     });
  //   }
  // }
}
