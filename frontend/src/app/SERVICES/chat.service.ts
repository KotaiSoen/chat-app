import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../MODELS/group';
import { Message } from '../MODELS/message';
import { User } from '../MODELS/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private groupCollection!: AngularFirestoreCollection;
  groups!: Observable<Group[]>;

  private usersCollection!: AngularFirestoreCollection<User>;
  users!: Observable<User[]>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.groupCollection = afs.collection<Group>('groups');
    this.groups = this.groupCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Group;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  createChannel(group: Group) {
    this.groupCollection.add(group);
  }

  oneChannel(id: string) {
    return this.afs.doc<Group>(`groups/${id}`).valueChanges();
  }

  searchOneChannel(group: string) {
    return this.afs.collection('groups', ref => ref.where('name', '==', `${group}`)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Group;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getGroupMessages(id: string) {
    return this.afs.doc<string>(`message/${id}`).collection<Message>('messages', ref => ref.orderBy('sentAt', 'asc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  sendMessage(id: string, messageDetails: Message) {
    this.afs.doc<string>(`message/${id}`).collection<Message>('messages').add(messageDetails);
  }

  saveUser(user: User) {
    this.afs.doc<User>(`users/${user.uid}`).set(user);
  }

  getUserData(uid: string) {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  changeUserUsername(uid: string, username: string) {
    this.afs.doc<User>(`users/${uid}`).update({ name: username });
    window.alert('Username successfully changed');
  }

  async changeUserProfilePicture(event: any, uid: string) {
    const file = event.target.files[0];
    const filePath = `users/${uid}`;
    const fileRef = this.storage.ref(filePath);
    const task = await this.storage.upload(filePath, file);
    const downloadUrl = await fileRef.getDownloadURL().toPromise();
    this.afs.doc<User>(`users/${uid}`).update({ imageUrl: downloadUrl });
    window.alert('Profile picture successfully updated')
  }

  addMemberToGroup(channelId: string, uid: string) {
    let members: string[] = [];
    this.afs.doc<Group>(`groups/${channelId}`).valueChanges().subscribe((result) => {
      let groupMembers = result!.members!;
      if (groupMembers) {
        members = groupMembers;
        if (!members.includes(uid)) {
          console.log(members);
          members.push(uid);
          this.afs.doc<Group>(`groups/${channelId}`).update({ members: members });
        }
      } else {
        members.push(uid);
        this.afs.doc<Group>(`groups/${channelId}`).update({ members: members });
      }
    })
  }
}
