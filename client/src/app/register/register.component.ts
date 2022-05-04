import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  selectedDevice: string;
  options = [{ id: 'Admin', title: 'Administrator' }, { id: 'User', title: 'Regular User' }];
  ngSelect = this.options[1];

  constructor(private accountService: AccountService) {
    this.model.access = this.ngSelect.id;
  }

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe((response) => {
      console.log(response);
      this.cancel();
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  selectChangeHandler(event: any) {
    this.model.access = event.target.value;
    console.log(this.selectedDevice);
  }
}
