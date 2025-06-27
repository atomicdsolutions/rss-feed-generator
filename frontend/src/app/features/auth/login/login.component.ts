import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h 
    h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div class="mt-8 space-y-6">
          <p class="text-center">Login functionality coming soon...</p>
          <div class="text-center">
            <a routerLink="/auth/register" class="text-blue-600 hover:text-blue-800">
              Need an account? Register
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {}