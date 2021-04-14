import { TestBed, waitForAsync } from '@angular/core/testing'
import { NgxsHistoryUndo } from './models/ngxs-history.actions'
import { NGXS_HISTORY_PLUGIN_OPTIONS } from './models/plugin-options'
import { NgxHistoryPlugin } from './ngxs-history.plugin'
import { NgxsHistoryService } from './ngxs-history.service'

describe('NgxsHistoryPlugin', () => {
  let ngxHistoryPlugin: NgxHistoryPlugin
  let ngxsHistoryService: NgxsHistoryService
  const STATE_NAME = 'todo'
  const HISTORY_LENGTH = 3

  class ActionName {
    static readonly type = 'Action does something'
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          NgxHistoryPlugin,
          {
            provide: NGXS_HISTORY_PLUGIN_OPTIONS,
            useValue: {
              historyLength: HISTORY_LENGTH,
            },
          },
          NgxsHistoryService,
        ],
      })
      ngxHistoryPlugin = TestBed.inject(NgxHistoryPlugin)
      ngxsHistoryService = TestBed.inject(NgxsHistoryService)
    })
  )

  it('should be created', () => {
    expect(ngxHistoryPlugin).toBeTruthy()
  })

  it('should not keep history of the state', () => {
    // Arrange
    const state = {
      [STATE_NAME]: {
        items: ['item 1'],
      },
    }

    // Act
    ngxHistoryPlugin.handle(state, ActionName, (nextState, nextAction) => {
      // Assert
      expect(nextState.history).toBeUndefined()
      expect(nextState[STATE_NAME]).toEqual(state[STATE_NAME])
    })
  })

  it('should have a history property', () => {
    // Arrange
    const state = {
      [STATE_NAME]: {
        items: ['item 1'],
      },
    }

    spyOn(ngxsHistoryService, 'getStateName').and.returnValue(STATE_NAME)

    // Act
    ngxHistoryPlugin.handle(state, ActionName, (nextState, nextAction) => {
      // Assert
      expect(nextState.history).toBeDefined()
      expect(nextState[STATE_NAME]).toEqual(state[STATE_NAME])
    })
  })

  it('should keep history of the state', () => {
    // Arrange
    const state = {
      [STATE_NAME]: {
        items: ['item 1', 'item 2'],
      },
      history: [
        {
          stateName: STATE_NAME,
          data: {
            items: ['item 1'],
          },
        },
      ],
    }

    spyOn(ngxsHistoryService, 'getStateName').and.returnValue(STATE_NAME)

    // Act
    ngxHistoryPlugin.handle(state, ActionName, (nextState, nextAction) => {
      // Assert
      const history = nextState.history as any[]
      expect(history.length).toBe(2)
      expect(history.every((it) => it.stateName === STATE_NAME)).toBeTruthy()
      expect(nextState[STATE_NAME]).toEqual(state[STATE_NAME])
    })
  })

  it('should undo in the previous history state', () => {
    // Arrange
    const state = {
      [STATE_NAME]: {
        items: ['item 1', 'item 2', 'item 3'],
      },
      history: [
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
      ],
    }

    spyOn(ngxsHistoryService, 'getStateName').and.returnValue(STATE_NAME)

    // Act
    ngxHistoryPlugin.handle(state, NgxsHistoryUndo, (nextState, nextAction) => {
      // Assert
      const history = nextState.history as any[]
      expect(history.length).toBe(1)
      expect(history[0].data.items).toEqual(['item 1'])
      expect(history.every((it) => it.stateName === STATE_NAME)).toBeTruthy()
      expect(nextState[STATE_NAME].items).toEqual(['item 1', 'item 2'])
    })
  })

  it('should discard history changes that exceed the limit', () => {
    // Arrange
    const state = {
      [STATE_NAME]: {
        items: ['item 1', 'item 2', 'item 3', 'item 4'],
      },
      history: [
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
      ],
    }

    spyOn(ngxsHistoryService, 'getStateName').and.returnValue(STATE_NAME)

    // Act
    ngxHistoryPlugin.handle(state, ActionName, (nextState, nextAction) => {
      // Assert
      const history = nextState.history as any[]
      expect(history.length).toBe(HISTORY_LENGTH)
      expect(history[0].data.items).toEqual(['item 1', 'item 2'])
      expect(history[1].data.items).toEqual(['item 1', 'item 2', 'item 3'])
      expect(history[2].data.items).toEqual(['item 1', 'item 2', 'item 3', 'item 4'])
      expect(history.every((it) => it.stateName === STATE_NAME)).toBeTruthy()
    })
  })
})
