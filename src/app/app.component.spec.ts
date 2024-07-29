import { TestBed, fakeAsync, tick, async, flushMicrotasks, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StoryService } from './story.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AppComponent', () => {
  let component: AppComponent;
  let service: StoryService;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, 
        HttpClientTestingModule, 
        MatPaginatorModule, 
        MatSortModule, 
        MatTableModule,
        MatProgressSpinnerModule],
      declarations: [AppComponent],
      providers: [StoryService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StoryService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
    expect(component.stories.length).toBe(0);
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
