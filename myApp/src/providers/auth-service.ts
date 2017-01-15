import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  public fireAuth: any;
  public userProfile: any;
  
  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
 
  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(email.replace('.', ',')).set({email: email, uid: newUser.uid});
      });
  }
 
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }

}
