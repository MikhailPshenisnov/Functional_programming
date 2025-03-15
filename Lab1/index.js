// Функция для задания 1.1
ListOfEven = numberList => numberList.filter(x => x % 2 === 0);

// Функция для задания 1.2
ListOfSquares = numberList => UseSomeFunc(x => Math.pow(x, 2), numberList);

// Функция для задания 1.3
ObjectListFilter = (objectList, n) => JSON.parse(JSON.stringify(objectList)).filter(x => x.Number > n);

// Функция для задания 1.4
SumOfList = numberList => numberList.reduce((sum, x) => sum + x, 0);

// Функция для задания 2.1
UseSomeFunc = (func, list) => list.map(x => func(x));

// Класс для демонстрации работы функций
class Number {
    constructor(n) {
        this.Number = n;
    }
}

// Вывод для 3.1
Task31 = numberList => SumOfList(ListOfSquares(ListOfEven(numberList)))
console.log(`Результат для задания 3.1: ${Task31([1, 2, 3, 4, 5, 6, 7])}`);

// Вывод для 3.2
Task32 = (numberList, x) => {
    const tmpList = UseSomeFunc(o => o.Number, ObjectListFilter(numberList, x))
    return SumOfList(tmpList) / tmpList.length;
}
console.log(`Результат для задания 3.2: ${Task32(
    [
        new Number(1),
        new Number(2),
        new Number(3),
        new Number(4),
        new Number(5),
        new Number(6),
        new Number(7)
    ],
    3
)}`);
