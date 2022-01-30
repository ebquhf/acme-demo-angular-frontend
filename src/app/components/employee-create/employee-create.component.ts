import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  ngOnInit(): void {
  }
  
 // Choose designation with select dropdown
 updateProfile(e: any){
  var element = e.target as HTMLSelectElement
  this.employeeForm?.get('designation')?.setValue(element.value, {
    onlySelf: true
  })
}
// Getter to access form control
get myForm(){
  return this.employeeForm.controls;
}
get name(){
  return this.employeeForm.get('name');
}

get email(){
  return this.employeeForm.get('email');
}

get designation(){
  return this.employeeForm.get('designation');
}

get phoneNumber(){
  return this.employeeForm.get('phoneNumber');
}
onSubmit() {
  this.submitted = true;
  if (!this.employeeForm.valid) {
    return false;
  } else {
    this.apiService.createEmployee(this.employeeForm.value).subscribe(
      (res) => {
        console.log('Employee successfully created!')
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      }, (error) => {
        console.log(error);
      });
    return true;
  }
}
}
