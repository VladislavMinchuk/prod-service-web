import { breakfast, dinner, lunch } from "../consts";
import { findDateStr, getValueByKey, parseToNum } from "../helpers";
import { calculateTotalProducts } from "./dishCalculation";
import { IDishObj, IMealObj, IProduct } from "./menuTableParser";

interface ISingleProductRow {
    number: number,
    name: string,
    perPersonBreakfast: string | number,
    perTeamBreakfast: string | number,
    perPersonLunch: string | number,
    perTeamLunch: string | number,
    perPersonDinner: string | number,
    perTeamDinner: string | number,
    perPersonTotal: string | number,
    perTeamTotal: string | number,
}

export interface IInvoiceData {
    date: string,
    numberPeople: number | string,
    breakfastDishes: string[],
    lunchDishes: string[],
    dinnerDishes: string[],
    products: ISingleProductRow[]
};

interface IParseProps {
    dayTitle: string,
    numberPeople: number | string,
    inputData: IMealObj,
    singleData: IMealObj
};

const getProductValueInDishes = (product: string, dish: IDishObj): number => {
    return Object.keys(dish).reduce((prev, curr) => {
        const prodList = getValueByKey(curr, dish);
        if (!prodList[product]) return prev;

        return parseToNum(prev) + parseToNum(prodList[product]);
    }, 0)
};

export const parseIntoInvoice = ({ dayTitle, numberPeople, inputData, singleData }: IParseProps): IInvoiceData => {
    const totalPerTeam: IProduct = calculateTotalProducts(inputData);
    const totalPerPerson: IProduct = calculateTotalProducts(singleData);
    const date: string = findDateStr(dayTitle);
    const personBreakfast = singleData[breakfast];
    const personLunch = singleData[lunch];
    const personDinner = singleData[dinner];
    const teamBreakfast = inputData[breakfast];
    const teamLunch = inputData[lunch];
    const teamDinner = inputData[dinner];

    const singleProductsList = Object.keys(totalPerPerson).map((product, idx) => {
        return {
            number: idx + 1,
            name: product,
            perPersonBreakfast: getProductValueInDishes(product, personBreakfast),
            perTeamBreakfast: getProductValueInDishes(product, teamBreakfast),
            perPersonLunch: getProductValueInDishes(product, personLunch),
            perTeamLunch: getProductValueInDishes(product, teamLunch),
            perPersonDinner: getProductValueInDishes(product, personDinner),
            perTeamDinner: getProductValueInDishes(product, teamDinner),
            perPersonTotal: totalPerPerson[product],
            perTeamTotal: totalPerTeam[product],
        }
    });

    return {
        date: date,
        numberPeople: numberPeople,
        breakfastDishes: Object.keys(teamBreakfast),
        lunchDishes: Object.keys(teamLunch),
        dinnerDishes: Object.keys(teamDinner),
        products: singleProductsList
    }
};