import { useEffect, useReducer } from "react";
import { IMenuObj } from "@/app/lib/menuTableParser";
import MenuSingleDay from "./MenuSingleDay";
import Popup from "../Popup";
import { getValueByKey } from "@/app/helpers";
import MealCalcForm from "./MealForm";
import { dayListReducer } from "@/app/reducers";
import { DayListActionsKind } from "@/app/reducers/dayListReducer";

interface MenuFullListProps {
    menuObject: IMenuObj
};

const MenuFullList: React.FC<MenuFullListProps> = ({ menuObject }) => {
    const [dayList, setDayList] = useReducer(dayListReducer, []);

    const showPopupDay = (index: number): void => {
        setDayList({ type: DayListActionsKind.SHOW_POPUP, payload: index });
    };
    const hidePopupDay = (index: number): void => {
        setDayList({ type: DayListActionsKind.HIDE_POPUP, payload: index });
    };
    
    useEffect(() => {
        setDayList({ type: DayListActionsKind.SET_LIST, payload: Object.keys(menuObject) });
    }, [menuObject])
    
    return (
        <ul>
            {dayList.length > 0 && 
                <ul className="md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3">
                    { dayList.map(({ name: dayName, popupOpened }, index) => {
                    // { dayList.map(({ name: fullDayName, data, dayName, popupOpened }, index) => {
                        return <li key={index} className="p-2 md:p-4 mb-4 border-2">
                            <div className="flex justify-between">
                                <span className="font-bold mr-2">{dayName}</span>
                                <button onClick={() => showPopupDay(index)} className="transition bg-indigo-500 hover:bg-indigo-400 py-1 px-2 text-white">
                                    Відкрити
                                </button>
                            </div>
                            <MenuSingleDay dayObject={getValueByKey(dayName, menuObject)} />
                            <Popup key={index} isOpen={popupOpened} onClose={() => hidePopupDay(index)}>
                                <MealCalcForm dayTitle={dayName} originFormObj={getValueByKey(dayName, menuObject)} />
                            </Popup>
                        </li>
                    }) }
                </ul>
            }
        </ul>
    );
}

export default MenuFullList;
