import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../global/services/data-service.service';
import { AlertService } from '../../../global/services/alert-service.service';
import { UserService } from '../../../global/services/user-service.service';

@Component({
	template: '<form class="form-inline my-2 my-lg-0">'+
           	 		'<input class="form-control mr-sm-2" type="search" placeholder="Search Users" aria-label="Search">'+
            		'<button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>'+
        		'</form>',
    selector: 'app-search-bar'
})

export class SearchComponent {

	@HostListener('submit', ['$event'])
	async doSearch(event){
		event.preventDefault();
	}
}