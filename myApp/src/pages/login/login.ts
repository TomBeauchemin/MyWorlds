import { 
  NavController, 
  LoadingController, 
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { LocationTracker } from '../../providers/location-tracker';
import { MapViewPage } from '../map-view/map-view';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  constructor(
    public nav: NavController, 
    public authData: AuthService, 
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController, 
    public locationTracker: LocationTracker) 
  {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  loginUser() {
    this.submitAttempt = true;
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.nav.push(TabsPage);
        this.locationTracker.startTracking();
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({});
    }
  }

  goToSignup(){
    this.nav.push(RegisterPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}