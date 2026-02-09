import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/api/users/register', user)
      .subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Registration failed');
        }
      });
  }
}
