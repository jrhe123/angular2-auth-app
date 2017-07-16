import { Component } from '@angular/core';

// Services
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

// Router Service
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	name: String;
	username: String;
	email: String;
	password: String;

	// Inject Service in Constructor
	constructor(
		private validateService: ValidateService, 
		private authService: AuthService, 
		private flashMessagesService: FlashMessagesService,
		private router: Router
	){}

	onRegisterSubmit(){
		const user = {
			name: this.name,
			username: this.username,
			email: this.email,
			password: this.password
		}

		// Validate Service
		if(!this.validateService.validateRegister(user)){
			this.flashMessagesService.show("missing fields", {cssClass: "alert-danger-msg", timeout: 3000});
			return false;
		}

		if(!this.validateService.validateEmail(user.email)){
			this.flashMessagesService.show("invalid email", {cssClass: "alert-danger-msg", timeout: 3000});
			return false;
		}

		// Register Service => Observable => Subscribe
		this.authService.registerUser(user).subscribe(data => {
			if(data.success){
				this.flashMessagesService.show("You are now registered and can login", {cssClass: "alert-success-msg", timeout: 3000});
				this.router.navigate(['/login']);
			} else {
				this.flashMessagesService.show("Register failed", {cssClass: "alert-danger-msg", timeout: 3000});
				this.router.navigate(['/register']);
			}
		});
	}
}
