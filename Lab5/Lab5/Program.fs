open System

let add (x: double) (y: double) : double = x + y

let subtract (x: double) (y: double) : double = x - y

let multiply (x: double) (y: double) : double = x * y

let divide (x: double) (y: double) : double =
    if y = 0 then
        failwith "Division by zero"

    x / y

let add5 = add 5
let multiplyBy2 = multiply 2


let rec factorial (n: int) : int =
    if n < 0 then failwith "N must be greater or equals to 0"
    elif n = 0 || n = 1 then 1
    else n * factorial (n - 1)

[<EntryPoint>]
let main (argv: string[]) : int =
    Console.WriteLine($"Sum: {add 3 4}")
    Console.WriteLine($"Difference: {subtract 10 7}")
    Console.WriteLine($"Product: {multiply 5 6}")
    Console.WriteLine($"Division: {divide 10 4}")
    Console.WriteLine($"Add 5 to 10: {add5 10}")
    Console.WriteLine($"Multiply 7 by 2: {multiplyBy2 7}")
    Console.WriteLine($"Factorial of 5: {factorial 5}")
    0
