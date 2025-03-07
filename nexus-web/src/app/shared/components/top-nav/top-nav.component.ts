import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../../context/context-service';

@Component({
    selector: 'top-nav',
    templateUrl: './top-nav.component.html',
    standalone: true,
    imports: []
})
export class TopNavComponent implements OnInit {
    constructor(private contextService: ContextService) {
    }

    get displayName() {
        return this.contextService.getUser()?.displayName;
    }

    ngOnInit() {
    }
}
