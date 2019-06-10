import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert-service/alert-service.component';
import { Alert, AlertType } from './models';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
	alerts: Alert[] = [];

	constructor(private alertService: AlertService){ }

	ngOnInit() {
		/* subscribe to alert service alert instantiation */
		this.alertService.get().subscribe((alert: Alert) => {
			if(!alert){
				this.alerts = [];
				return;
			}
			this.alerts.push(alert);
		});
	}

	remove(alert: Alert){
		this.alerts = this.alerts.filter(x => x !== alert);
	}

	getClass(alert: Alert){
		if(!alert){
			return;
		}

		switch(alert.type){

			case AlertType.Success:
				return 'alert alert-success';
			case AlertType.Error:
				return 'alert alert-warning';
			case AlertType.Unauthorized:
				return 'alert alert-danger';
		}
	}
}