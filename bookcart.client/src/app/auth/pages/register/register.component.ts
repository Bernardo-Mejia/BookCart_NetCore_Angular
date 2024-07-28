import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError, Subject, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackBarService: MatSnackBar // private customValidation: CustomValidationService
  ) {}

  showPassword: boolean = true;
  showConfirmPassword: boolean = true;

  registrationForm = this.fb.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', [Validators.required]],
      gender: ['', Validators.required],
    },
    {
      // validator: this.customValidation.confirmPasswordValidator,
    }
  );

  get firstname() {
    return this.registrationForm.get('firstname');
  }

  get lastname() {
    return this.registrationForm.get('lastname');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  get gender() {
    return this.registrationForm.get('gender');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  registerUser() {
    /*
    if (this.registrationForm.valid) {
      this.userService
        .registerUser(this.registrationForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/login']);
          },
          (error) => {
            this.snackBarService.showSnackBar('Error occurred!! Try again');
            console.log('Error ocurred while adding book data : ', error);
          }
        );
    }
    */

    /*
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value).pipe(
        tap(() => {
          this.router.navigate(['/auth/login'])
        }),
        catchError((error) => {
          console.log(error)
          return throwError(error)
        })
      ).subscribe()
    }
    */

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.userService.registerUser(this.registrationForm.value).subscribe({
        next: (response) => {
          this.snackBarService.open(
            'User registred successfully. Please, Log on',
            'Ok',
            {
              duration: 2703,
            }
          );
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.snackBarService.open(error.message, 'Ok', {
            duration: 2703,
          });
        },
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
