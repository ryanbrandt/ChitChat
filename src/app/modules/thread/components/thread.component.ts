import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from  '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

@Component({
	templateUrl: '../templates/thread.component.html',
	styleUrls: ['../styles/thread.component.css']
})

export class ThreadComponent implements OnInit {
	Object = Object;
	loader;

	constructor(private dataService: DataService, private alertService: AlertService, private userService: UserService, private router: Router, private ref: ChangeDetectorRef){ }

	async ngOnInit(){  
		if(!this.userService.currentUser){ this.router.navigate(['']); }
		this.loader = document.getElementById('loader');
		this.loader.style.display = 'block';
		await this.dataService.getData();
		this.loader.style.display = 'none';
 	}


}