import { Component } from '@angular/core';

// Services
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	username: String;
	password: String;

	// Inject service in contructor
	constructor(
		private authService: AuthService,
		private flashMessagesService: FlashMessagesService,
		private router: Router
	){}

	onLoginSubmit(){
		
		const user = {
			username: this.username,
			password: this.password
		}

		this.authService.authenticateUser(user).subscribe(data => {
			if(data.success){
				this.authService.storeUserData(data.token, data.user);
				this.flashMessagesService.show('Login Success', {
					cssClass: 'alert-success-msg', 
					timeout: 3000
				});
				this.router.navigate(['/dashboard']);
			} else {
				this.flashMessagesService.show(data.msg, {
					cssClass: 'alert-danger-msg', 
					timeout: 3000
				});
				this.router.navigate(['/login']);
			}
		});
	}

}