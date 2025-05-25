import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TodoComponent } from './todo.component'
import { provideStore, Store } from '@ngxs/store'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TodoState } from '../store/todo.state'
import { NgxsActionCollectorService, provideNgxsActionCollector } from 'src/app/services/ngxs-action-collector.service'
import { AddTodo } from '../store/todo.actions'

describe('TodoComponent', () => {
  let component: TodoComponent
  let fixture: ComponentFixture<TodoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        TodoComponent,
      ],
      providers: [
        provideStore([TodoState]),
        provideNgxsActionCollector(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  const testSetup = () => {
    const store = TestBed.inject(Store);
    const actionCollector = TestBed.inject(NgxsActionCollectorService);
    const actionsDispatched = actionCollector.dispatched;

    return { store, actionsDispatched };
  };

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch todo action with title value when click on add button', () => {
    const { store, actionsDispatched } = testSetup();
    component.newTitle = 'test'

    fixture.debugElement.nativeElement.querySelector('button').click();

    expect(actionsDispatched.some(action => action instanceof AddTodo)).toBeTruthy();
    const action = actionsDispatched.filter(action => action instanceof AddTodo)[0]
    expect((action as AddTodo).title).toBe('test');
  });

  it('should reset title when click on add button', () => {
    component.newTitle = 'test'

    fixture.debugElement.nativeElement.querySelector('button').click();

    expect(component.newTitle).toBe('');
  });
})
