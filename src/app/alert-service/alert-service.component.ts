import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Alert, AlertType } from '../alert/models';
import { AlertComponent } from '../alert/alert.component';
import { Subject } from 'rxjs';

/* global alert manager */
@Injectable()
export class AlertService {
	private subject = new Subject<Alert>();

	constructor(private router: Router){
		/* clear alerts on router change */
		router.events.subscribe(event => {
			if(event instanceof NavigationStart){
				this.clear();
			}
		});
	}

	get(){
		return this.subject.asObservable();
	}

	alert(type: AlertType, message: string){
		this.subject.next(<Alert>{type: type, message: message});
	}

	success(message: string){
		this.alert(AlertType.Success, message);
	}

	unauthorized(message: string){
		this.alert(AlertType.Unauthorized, message);
	}
	error(message: string){
		this.alert(AlertType.Error, message);
	}

	clear(){
		this.subject.next();
	}
}