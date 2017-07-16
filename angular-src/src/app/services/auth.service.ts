import { Injectable } from '@angular/core';

//
// import { Task } from '../obj/task';
//

// Services
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; // Observable

// Authentication
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService{

	// Array of specified obj
	//tasks: Task[];

	authToken: any;
	user: any;

	// Inject Service in Constructor
	constructor(private http: Http){}


	// Call API
	registerUser(user){

		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:3000/users/register', user, {headers})
			.map(res => res.json());
	}

	// Call API
	authenticateUser(user){

		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:3000/users/authenticate', user, {headers})
			.map(res => res.json());
	}

	// CALL API
	storeUserData(token, user){
		// Authentication settings
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	// Call API
	getProfile(){

		let headers = new Headers();
		this.loadToken();
		headers.append('Authorization', this.authToken);
		headers.append('Content-Type','application/json');
		return this.http.get('http://localhost:3000/users/profile', {headers})
			.map(res => res.json());
	}
	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	// Check Login
	loggedIn(){
		return tokenNotExpired();
	}

	// Logout
	logout(){
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
}