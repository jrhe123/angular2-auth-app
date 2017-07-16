// Default module settings
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Router settings
import { RouterModule, Routes } from '@angular/router';

// Guard
import { AuthGuard } from './guards/auth.guard';

// Components 
import { AppComponent } from './app.component';
import { DashboardComponent } from 'app/components/dashboard/dashboard.component';
import { HomeComponent } from 'app/components/home/home.component';
import { LoginComponent } from 'app/components/login/login.component';
import { NavbarComponent } from 'app/components/navbar/navbar.component';
import { ProfileComponent } from 'app/components/profile/profile.component';
import { RegisterComponent } from 'app/components/register/register.component';

// Services
import { ValidateService } from 'app/services/validate.service';
import { AuthService } from 'app/services/auth.service';

// Modules
import { FlashMessagesModule } from 'angular2-flash-messages';

// Router settings => app.component.html
const appRoutes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]}, // Guard by token
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]}, // Guard by token
];


@NgModule({
  // component
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  // module
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // Router
    RouterModule.forRoot(appRoutes),

    // Flash Messages
    FlashMessagesModule
  ],
  // service
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }