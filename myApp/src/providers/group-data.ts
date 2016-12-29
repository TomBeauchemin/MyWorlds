import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class GroupData {
  public currentUser: any;
  public groupList: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.groupList = firebase.database().ref('user-groups/' + this.currentUser);
  }

  getGroupList(): any {
    return this.groupList;
  }

  getGroupDetail(groupId): any {
    return this.groupList.child(groupId);
  }

}