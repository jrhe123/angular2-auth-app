import { Component } from '@angular/core';

// Services
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	// Inject service in contructor
	constructor(
		private authService: AuthService,
		private flashMessagesService: FlashMessagesService,
		private router: Router
	){}

	// Collapse settings
	isIn = false;
    toggleState() {
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }

    onLogoutClick(){
    	this.authService.logout();
    	this.flashMessagesService.show('You are logged out', {
    		cssClass: 'alert-success-msg', 
    		timeout: 3000
    	});
    	this.router.navigate(['/login']);
    	return false;
    }
}
