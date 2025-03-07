import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  users: any;

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.users = users[+id];
      }
    });
  }  
  GetInitial(user: any): string {
    return (user.firstname?.[0] || '') + (user.lastname?.[0] || '');
  }
}
