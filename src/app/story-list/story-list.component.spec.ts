import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { StoryService } from '../story.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;

  let service: StoryService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [StoryListComponent],
      providers: [StoryService],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StoryService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StoryListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get stories on init', fakeAsync(() => {
    const spy = spyOn(service, 'getStories').and.returnValue(of([]));
    fixture.detectChanges();
    component.ngAfterViewInit();
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.stories.data.length).toBe(0);
  }));

  it('should handle stories on pagination', fakeAsync(() => {
    const spy = spyOn(service, 'getStories').and.returnValue(
      of([
        { id: 1, title: "story-1", url: "story-1.com" },
        { id: 2, title: "story-2", url: "story-2.com" },
        { id: 3, title: "story-3", url: "story-3.com" },
        { id: 4, title: "story-4", url: "story-4.com" },
        { id: 5, title: "story-5", url: "story-5.com" }
      ])
    );
    fixture.detectChanges();
    component.ngAfterViewInit();
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.isLoadingResults).toBeFalse();
  }));

});
