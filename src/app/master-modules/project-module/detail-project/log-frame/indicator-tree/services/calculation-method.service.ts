import { AppService } from '../../../../../../services/app.service';
import { Injectable } from '@angular/core';
import { apiRoutes } from '../../../../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CalculationMethodService {

  constructor(private app:AppService) { }

  index(){
    return this.app.get(apiRoutes.calculationMethod.index);
  }

  show(id){
    return this.app.show(apiRoutes.calculationMethod.show,id);
  }
}
