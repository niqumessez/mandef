import { Injectable } from '@angular/core';
import {ToasterService} from 'angular5-toaster/dist';

@Injectable({
  providedIn: 'root'
})
export class ToasterNotificationService {

  constructor(public toasterService: ToasterService) { }

  private pop(type, title, message) {
    this.toasterService.popAsync(type, title, message);
  }

  public error(title, message) {
    this.pop('error', title, message);
  }

  public success(title, message) {
    this.pop('success', title, message);
  }

  public warning(title, message) {
    this.pop('warning', title, message);
  }

  public info(title, message) {
    this.pop('info', title, message);
  }
}
