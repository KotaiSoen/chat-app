import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../MODELS/group';
import { Message } from '../MODELS/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private groupCollection!: AngularFirestoreCollection;
  groups!: Observable<Group[]>;

  messages!: Observable<Message[]>;

  constructor(private afs: AngularFirestore) { 
    this.groupCollection = afs.collection<Group>('groups');
    this.groups = this.groupCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Group;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    )
  }

  createChannel(group: Group) {
    this.groupCollection.add(group);
  }

  oneChannel(id: string) {
    return this.afs.doc<Group>(`groups/${id}`).valueChanges();
  }

  getGroupMessages(id: string) {
    return this.afs.doc<string>(`message/${id}`).collection<Message>('messages', ref => ref.orderBy('sentAt', 'asc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    )
  }

  sendMessage(id: string, messageDetails: Message) {
    this.afs.doc<string>(`message/${id}`).collection<Message>('messages').add(messageDetails);
  }
}
