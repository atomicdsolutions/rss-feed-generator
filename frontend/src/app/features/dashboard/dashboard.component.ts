import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">
            Welcome to RSS Feed Generator
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Generate and manage your RSS feeds with ease
          </p>
          <div class="space-x-4">
            <a routerLink="/auth/login" 
               class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}