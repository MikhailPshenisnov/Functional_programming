// Функция для задания 1.1
ListOfEven = numberList => numberList.filter(x => x % 2 === 0);

// Функция для задания 1.2
ListOfSquares = numberList => UseSomeFunc(x => Math.pow(x, 2), numberList);

// Функция для задания 1.3
ObjectListFilter = objectList => JSON.parse(JSON.stringify(objectList)).filter(x => x.Name.length > 3);

// Функция для задания 1.4
SumOfList = numberList => numberList.reduce((sum, x) => sum + x, 0);

// Функция для задания 2.1
UseSomeFunc = (func, list) => list.map(x => func(x));

// Объект для функции ObjectListFilter
class Person {
    constructor(name) {
        this.Name = name;
    }
}

// Вывод для 3.1
Task31 = numberList => SumOfList(ListOfSquares(ListOfEven(numberList)))
console.log(`Результат для задания 3.1: ${Task31([1, 2, 3, 4, 5, 6, 7])}`);

// Вывод для 3.2
Task32 = (numberList, n) => {
    const tmpList = numberList.filter(x => x > n);
    return SumOfList(tmpList) / tmpList.length;
}
console.log(`Результат для задания 3.2: ${Task32([1, 2, 3, 4, 5, 6, 7], 3)}`);

// Пример вывода для 1.3
console.log(`Пример для 1.3: ${
    ObjectListFilter([
        new Person("Ваня"),
        new Person("Оля"),
        new Person("Петя"),
        new Person("Юля"),
        new Person("Маша")
    ]).map(x => x.Name).join(", ")
}`);




