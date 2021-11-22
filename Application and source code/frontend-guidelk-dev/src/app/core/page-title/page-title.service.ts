import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PageTitleService {
    // @ts-ignore
    public title: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    setTitle(value: string) {
        this.title.next(value);
    }
}