import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, OperatorFunction } from 'rxjs';

export abstract class AutocompletionSearch {

    protected userRole: string;
    protected userItems: Array<any>;

    constructor(){
        this.userRole = "all";
        this.userItems = new Array();
    }

    /* User's autocompletion */
    searchUser: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term === '' ? [] : this.userItems.filter(x => {
            if(this.userRole === "all") return x;
            else if(x.role === this.userRole) return x;

        })
        .map(x => x.prenom + ' ' + x.nom)
        .filter(x => x.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

    setRoleUser(role: string){
        this.userRole = role;
    }
}
