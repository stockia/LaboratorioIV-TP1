import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessagesService, ChatMessage } from '../../services/chat-messages.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentUser!: string;
  private messagesSubscription!: Subscription;
  isOpen: boolean = false;

  constructor(private chatService: ChatMessagesService, public auth: Auth) {
    this.currentUser = this.auth.currentUser?.email || 'Anonimo';
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.messagesSubscription = this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.currentUser, this.newMessage);
      this.newMessage = '';
    }
  }
}
