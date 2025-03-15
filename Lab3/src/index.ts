// Функция для задания 1.1
function FilterMultiples(
    numberList: number[],
    x: number
): number[] {
    return numberList.filter(n => n % x === 0);
}

// Функция для задания 1.2
function JoinStringList(
    stringList: string[],
    separator: string
): string {
    return stringList.join(separator);
}

// Функция для задания 1.3
function FilterObjectList<T, K extends keyof T>(
    objectList: T[],
    sortProperty: K,
    reverse: boolean = false
): T[] {
    return [...objectList].sort((a, b) => {
        const valueA = a[sortProperty];
        const valueB = b[sortProperty];
        if (typeof valueA === 'number' && typeof valueB === 'number')
            return reverse ? valueB - valueA : valueA - valueB;
        else if (typeof valueA === 'string' && typeof valueB === 'string')
            return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        return 0;
    });
}

// Функция для задания 2.1
function AddLogging<T extends (...args: any[]) => any>(
    func: T,
    loggerFunc: (message: string) => void = console.log
): T {
    const newFunc = (...args: Parameters<T>): ReturnType<T> => {
        try {
            loggerFunc(`Beginning of the function ${func.name} with the following arguments: ${JSON.stringify(args)}`);
            const result = func(...args);
            loggerFunc(`Function ${func.name} is successful with the following result: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            loggerFunc(`Function ${func.name} was interrupted with the following error: ${errorMessage}`);
            throw error;
        }
    }
    return newFunc as T;
}

// Объект для демонстрации работы с объектами
class Person {
    public Name: string;
    public Age: number;

    public constructor(name: string, age: number) {
        this.Name = name;
        this.Age = age;
    }
}

// Демонстрация работы функций
function main(): void {
    console.log(
        FilterMultiples(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            3));
    console.log(
        JoinStringList(
            ["qwerty", "asdfgh", "zxcvbn"],
            " - "));
    console.log(
        FilterObjectList(
            [new Person("Oleg", 20), new Person("Vladimir", 22), new Person("Maria", 21)],
            "Name"));

    const FilterMultiplesWithLogging = AddLogging(FilterMultiples);
    const JoinStringListWithLogging = AddLogging(JoinStringList);
    const FilterObjectListWithLogging = AddLogging(FilterObjectList);

    console.log(
        FilterMultiplesWithLogging(
            [8, 4, 5, 47, 155, 23, 700, 15, 46, 17, 30, 100],
            5));
    console.log(
        JoinStringListWithLogging(
            ["Один", "два", "три"],
            ":"));
    console.log(
        FilterObjectListWithLogging(
            [new Person("Alexander", 13), new Person("Vladislav", 27), new Person("Magomed", 42)],
            "Age",
            true));
}

main();