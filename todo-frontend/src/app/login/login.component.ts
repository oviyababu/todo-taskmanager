import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{5,}$/;

    // Validation
    if (!nameRegex.test(this.name)) {
      this.error = 'Name must contain only alphabets';
      return;
    }

    if (!emailRegex.test(this.email)) {
      this.error = 'Valid Email address required (must contain @gmail.com)';
      return;
    }

    if (!passwordRegex.test(this.password)) {
      this.error = 'Password must be 5 characters and include a number';
      return;
    }

    // Prepare login data
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Call backend login API
    this.http.post<any>('http://localhost:8080/users/login', loginData).subscribe({
      next: (res) => {
        // Success
        localStorage.setItem('username', res.name);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        // Error from backend
        this.error = err.error;
      }
    });
  }
}
