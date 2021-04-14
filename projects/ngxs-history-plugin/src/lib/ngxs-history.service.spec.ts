import { TestBed } from '@angular/core/testing'
import { NgxsHistoryService } from './ngxs-history.service'

describe('NgxsHistoryService', () => {
  let service: NgxsHistoryService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NgxsHistoryService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should NOT discard the history items', () => {
    const STATE_NAME = 'todo'
    const state = [
      {
        stateName: STATE_NAME,
        data: {
          items: ['item 1'],
        },
      },
      {
        stateName: STATE_NAME,
        data: {
          items: ['item 1', 'item 2'],
        },
      },
    ]
    const newState = service.discardUnwantedHistoryItems(state, { historyLength: 2 })
    expect(newState.length).toBe(state.length)
  })

  it('should discard the history items', () => {
    const STATE_NAME = 'todo'
    const state = [
      {
        stateName: STATE_NAME,
        data: {
          items: ['item 1'],
        },
      },
      {
        stateName: STATE_NAME,
        data: {
          items: ['item 1', 'item 2'],
        },
      },
      {
        stateName: STATE_NAME,
        data: {
          items: ['item 1', 'item 2', 'item 3'],
        },
      },
    ]
    const newState = service.discardUnwantedHistoryItems(state, { historyLength: 2 })
    expect(newState.length).toBe(state.length - 1)
    expect(newState[0].data).toEqual(state[1].data)
    expect(newState[1].data).toEqual(state[2].data)
  })
})
