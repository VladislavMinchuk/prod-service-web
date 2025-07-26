import { findDateStr } from "../helpers";

export enum DayListActionsKind {
    SHOW_POPUP = 'SHOW_POPUP',
    HIDE_POPUP = 'HIDE_POPUP',
    SET_LIST = 'SET_LIST',
};

type DayListAction =
    | { type: DayListActionsKind.SHOW_POPUP, payload: number, }
    | { type: DayListActionsKind.HIDE_POPUP, payload: number, }
    | { type: DayListActionsKind.SET_LIST, payload: string[], };

interface IDayListItem {
    name: string,
    popupOpened: boolean,
};

const dayListReducer = (state: IDayListItem[], action: DayListAction): IDayListItem[] => {
    const { type, payload } = action;

    switch (type) {
        case DayListActionsKind.SET_LIST:
            // return payload.map(day => ({ name: day, data: findDateStr(day), dayName: day.split(' ')[0], popupOpened: false })); // list of days
            return payload.map(day => ({ name: day, popupOpened: false })); // list of days
    
        case DayListActionsKind.SHOW_POPUP:
            state[payload].popupOpened = true; // get by index
            
            return [...state];
    
    
        case DayListActionsKind.HIDE_POPUP:
            state[payload].popupOpened = false; // get by index
            
            return [...state];
    
        default:
            return state;
    }

};

export default dayListReducer;