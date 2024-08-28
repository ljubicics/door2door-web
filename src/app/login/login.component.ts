import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<{ token: string }>('http://188.245.93.77:8080/api/v1/auth/login', loginData)
      .subscribe(response => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token);  // Čuvanje tokena u localStorage
        this.router.navigate(['/data-entry']);
      }, error => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });
  }
}