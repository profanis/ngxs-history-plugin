import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo/todo.component';
import { ShoppingComponent } from './shopping/shopping/shopping.component';
import { provideStore, Store } from '@ngxs/store';
import { ShoppingState } from './shopping/store/shopping.state';
import { TodoState } from './todo/store/todo.state';
import { NgxsHistoryUndo } from 'ngxs-history-plugin';
import { NgxsActionCollectorService, provideNgxsActionCollector } from './services/ngxs-action-collector.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: Store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TodoComponent,
        ShoppingComponent,
        AppComponent,
      ],
      providers: [
        provideStore([TodoState, ShoppingState]),
        provideNgxsActionCollector(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  const testSetup = () => {
    const actionCollector = TestBed.inject(NgxsActionCollectorService);
    const actionsDispatched = actionCollector.dispatched;

    return { actionsDispatched };
  };

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch undo action', () => {
    const { actionsDispatched } = testSetup();

    fixture.debugElement.nativeElement.querySelector('.undo').click();

    expect(actionsDispatched.some(action => action instanceof NgxsHistoryUndo)).toBeTruthy();
  });
});
