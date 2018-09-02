import { AppService } from '../../../../../../services/app.service';
import { Injectable } from '@angular/core';
import { apiRoutes } from '../../../../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private app:AppService) { }

  show(id){
    return this.app.show(apiRoutes.indicators.show,id);
  }
}
