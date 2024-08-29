import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent {
  senderEmail: string = '';
  pickupLocation: string = '';
  deliveryLocation: string = '';
  receiverEmail: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const deliveryData = {
      senderEmail: this.senderEmail,
      pickupLocation: this.pickupLocation,
      deliveryLocation: this.deliveryLocation,
      receiverEmail: this.receiverEmail
    };

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://188.245.93.77:8080/api/v1/deliveries/start', deliveryData, { headers })
      .subscribe(response => {
        console.log('Delivery started successfully:', response);
        alert('Delivery started successfully!');
        this.clearForm();
      }, error => {
        console.error('Error starting delivery:', error);
        alert('Failed to start delivery. Please check the entered information.');
      });
  }

  clearForm() {
    this.senderEmail = '';
    this.pickupLocation = '';
    this.deliveryLocation = '';
    this.receiverEmail = '';
  }

  onLogout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}