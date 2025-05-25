import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ShoppingComponent } from './shopping.component'
import { provideNgxsActionCollector } from 'src/app/services/ngxs-action-collector.service'
import { ShoppingState } from '../store/shopping.state'
import { provideStore } from '@ngxs/store'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

describe('ShoppingComponent', () => {
  let component: ShoppingComponent
  let fixture: ComponentFixture<ShoppingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ShoppingComponent,
      ],
      providers: [
        provideStore([ShoppingState]),
        provideNgxsActionCollector(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
