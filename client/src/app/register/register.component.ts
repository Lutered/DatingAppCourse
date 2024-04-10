import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model:any = {}

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next:() => {
        this.cancel();
      },
      error: error => console.error(error)
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
