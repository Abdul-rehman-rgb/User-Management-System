import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [Ng2SearchPipe]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  selectedRole: string = '';

  constructor(private router: Router, private searchPipe: Ng2SearchPipe) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const localData = localStorage.getItem('users');
    if (localData != null) {
      this.users = JSON.parse(localData);
      this.filteredUsers = [...this.users];
    }
  }

  filterUsers() {
    let filtered = this.users;

    if (this.searchText) {
      filtered = this.searchPipe.transform(filtered, this.searchText);
    }

    if (this.selectedRole) {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    this.filteredUsers = filtered;
  }

  GetInitial(user: any): string {
    return (user.firstname?.[0] || '') + (user.lastname?.[0] || '');
  }
  

  navigateToAddUser() {
    this.router.navigate(['users/add']);
  }

  Edit(index: number) {
    this.router.navigate(['/users/edit', index]);
  }

  DetailPage(index: number) {
    this.router.navigate(['/users/', index]);
  }

  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.filterUsers();
    }
  }
}
