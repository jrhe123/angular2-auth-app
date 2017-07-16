import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: Object;

	// Inject service in contructor
	constructor(
		private authService: AuthService,
		private flashMessagesService: FlashMessagesService,
		private router: Router
	){}

	ngOnInit(){
		this.authService.getProfile().subscribe(data => {
			this.user = data.user;
		},
		err => {
			console.log(err);
			return false;
		});
	}
}
