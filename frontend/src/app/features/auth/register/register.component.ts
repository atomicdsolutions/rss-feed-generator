import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <div class="mt-8 space-y-6">
          <p class="text-center">Registration functionality coming soon...</p>
          <div class="text-center">
            <a routerLink="/auth/login" class="text-blue-600 hover:text-blue-800">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {}