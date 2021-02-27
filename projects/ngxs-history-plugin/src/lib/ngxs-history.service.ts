// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Memento } from './models/memento';

// /**
//  * The Caretaker doesn't depend on the Concrete Memento class. Therefore, it
//  * doesn't have access to the originator's state, stored inside the memento. It
//  * works with all mementos via the base Memento interface.
//  */
// @Injectable({
//     providedIn: 'root'
// })
// export class NgxsHistoryService {
//     private mementos = new BehaviorSubject<Record<string, Memento[]>>({});

//     backup(stateName: string, memento: Memento): void {

//         if (this.mementos.value[stateName]) {
//           this.mementos.next({
//             ...this.mementos.value,
//             [stateName]: [...this.mementos.value[stateName], memento]
//           })
//         } else {
//           this.mementos.next({
//             ...this.mementos.value,
//             [stateName]: [memento]
//           })
//         }


//     }

//     undo(stateName: string): any {
//         if (!this.mementos.value[stateName].length) {
//             return [];
//         }

//         const lastItem = this.mementos.value[stateName].length - 1
//         const memento = this.mementos.value[stateName][lastItem]

//         this.mementos.next({
//           ...this.mementos.value,
//           [stateName]: [...this.mementos.value[stateName].slice(0, lastItem)]
//         })

//         return memento.state
//     }

//     showHistory(stateName: string): void {
//         for (const memento of this.mementos[stateName]) {
//             console.log(memento.date, JSON.stringify(memento.state));
//         }
//     }

//     hasUndo$(stateName: string): Observable<boolean> {
//       return this.mementos.asObservable().pipe(
//         map(mementos => {
//           return mementos[stateName] && !!mementos[stateName].length
//         })
//       )
//     }

// }
