import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Story } from '../story.model';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap, catchError } from 'rxjs';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {
  displayedColumns: string[] = ['id', 'title', 'url'];
  stories: Story[] = [];
  resultsLength = 200;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private storyServie : StoryService, private changeDetectorRef: ChangeDetectorRef){}
  ngAfterViewInit(): void {
    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.storyServie!.getStories(
          this.paginator.pageIndex +1,
          this.paginator.pageSize
        ).pipe(catchError(() =>[]));
      })
    )
    .subscribe(data => {
      this.isLoadingResults = false;
        this.stories = data;
       this.changeDetectorRef.detectChanges(); 
    });
  }
}
