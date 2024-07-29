import {HttpClient} from '@angular/common/http';
import { Story } from './story.model';
import { Response } from './response.model';
import { map, Observable, tap } from 'rxjs';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' }) 
export class StoryService{
    href : string = 'https://localhost:7055/api';
    private destroyRef = inject(DestroyRef);

    constructor(private _httpClient: HttpClient) {}

    getStories(page: number, pageSize: number): Observable<Story[]> {
            return this._httpClient.get<Response>(`${this.href}/story/GetStory/${page}/${pageSize}`)
            .pipe(takeUntilDestroyed(this.destroyRef), map(x => {
                if(x.status.toLocaleLowerCase() == "success" && x.results){
                    return x.results as Story[];
                }
                else{
                   return [];
                }
            }));
      }
}