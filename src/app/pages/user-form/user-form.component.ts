import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userform: FormGroup;
  editIndex: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userform = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+?\d{1,3}[-.●]?)?\(?\d{3}\)?[-.●]?\d{3}[-.●]?\d{4}$/),
      ]),
      role: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      dob: new FormControl(''),
    });
  }

  //Edit Function
  ngOnInit(): void { 
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.editIndex = +id;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users[this.editIndex]) {
          this.userform.patchValue(users[this.editIndex]);
        }
      }
    });
  }
  
  onSubmit() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const formData = this.userform.value;
  
    // check the username and email is already exist
    const isDuplicate = users.some((user: any, index: number) =>
      index !== this.editIndex && 
      (user.username === formData.username || user.email === formData.email)
    );
  
    if (isDuplicate) {
      alert('Error: Username or Email already exists!');
      return;
    }
  
    if (this.editIndex !== null) {
      users[this.editIndex] = formData;
    } else {
      users.push(formData);
    }
  
    localStorage.setItem('users', JSON.stringify(users));
    this.userform.reset();
    alert(this.editIndex !== null ? 'User Updated Successfully' : 'User Added Successfully');
    this.router.navigate(['/users']);
  }
  
}
