import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChatMessage {
  user: string;
  message: string;
  time: Date | Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  private messagesCollection: CollectionReference<ChatMessage>;
  messages: Observable<ChatMessage[]>;

  constructor(private firestore: Firestore) {
    this.messagesCollection = collection(this.firestore, 'messages') as CollectionReference<ChatMessage>;
    const messagesQuery = query(this.messagesCollection, orderBy('time', 'asc'));

    this.messages = collectionData(messagesQuery, { idField: 'id' });
  }

   sendMessage(user: string, message: string) {
    const time = new Date();
    const chatMessage: ChatMessage = { user, message, time };
    return addDoc(this.messagesCollection, chatMessage)
      .then(() => {})
      .catch((error) => {
        console.error('Error al enviar mensaje: ', error);
      });
   }

   getMessages(): Observable<ChatMessage[]> {
    return this.messages.pipe(
      map(messages => messages.map(message => {
        const date = (message.time as Timestamp).toDate();
        return {
          ...message,
          time: date
        };
      }))
    );
  }
}