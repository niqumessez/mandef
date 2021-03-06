import { AppService } from '../../services/app.service';
import { apiRoutes } from '../../app.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private app:AppService) { }

  index(){
    return this.app.get(apiRoutes.project.index);
  }
}
