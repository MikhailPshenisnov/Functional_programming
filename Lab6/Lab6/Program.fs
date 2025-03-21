open System

let add (x: double) (y: double) : double = x + y

let subtract (x: double) (y: double) : double = x - y

let multiply (x: double) (y: double) : double = x * y

let divide (x: double) (y: double) : double =
    if y = 0 then
        failwith "Division by zero"

    x / y

let power (x: double) (y: double) : double = Math.Pow(x, y)

let squareRoot (x: double) : double =
    if x < 0 then
        failwith "Square root of negative number"

    Math.Sqrt(x)

let sin (x: double) : double = Math.Sin(x)

let cos (x: double) : double = Math.Cos(x)

let tg (x: double) : double =
    let sine: double = Math.Sin(x)
    let cosine: double = Math.Cos(x)

    if Math.Round(cosine, 4) = 0 then
        failwith "Does not exist or strives for infinity"

    sine / cosine

let ctg (x: double) : double =
    let sine: double = Math.Sin(x)
    let cosine: double = Math.Cos(x)

    if Math.Round(sine, 4) = 0 then
        failwith "Does not exist or strives for infinity"

    cosine / sine

let degToRad (x: double) : double = x * (Math.PI / 180.00)

let sinDeg (x: double) : double = sin (degToRad x)

let cosDeg (x: double) : double = cos (degToRad x)

let tgDeg (x: double) : double = tg (degToRad x)

let ctgDeg (x: double) : double = ctg (degToRad x)

type Operation =
    | Add
    | Subtract
    | Multiply
    | Divide
    | Power
    | SquareRoot
    | Sin
    | SinDeg
    | Cos
    | CosDeg
    | Tg
    | TgDeg
    | Ctg
    | CtgDeg

let parseDouble (input: string) : double option =
    match Double.TryParse(input.Replace(".", ",")) with
    | true, value -> Some value
    | false, _ -> None

let printMenu () =
    Console.WriteLine(
        "Calculator (select the operation):
        1. Addition (x + y)
        2. Subtraction (x - y)
        3. Multiplication (x * y)
        4. Division (x / y)
        5. Power (x ^ y)
        6. Square root (sqrt(x))
        7_1. Sin radians (sin(x))
        7_2. Sin degrees (sin(x))
        8_1. Cos radians (cos(x))
        8_2. Cos degrees (cos(x))
        9_1. Tg radians (tg(x))
        9_2. Tg degrees (tg(x))
        0_1. Ctg radians (ctg(x))
        0_2. Ctg degrees (ctg(x))
        *. Exit (* or any other symbol)"
    )

let parseOperation (choice: string) : Operation option =
    match choice with
    | "1" -> Some Add
    | "2" -> Some Subtract
    | "3" -> Some Multiply
    | "4" -> Some Divide
    | "5" -> Some Power
    | "6" -> Some SquareRoot
    | "7_1" -> Some Sin
    | "7_2" -> Some SinDeg
    | "8_1" -> Some Cos
    | "8_2" -> Some CosDeg
    | "9_1" -> Some Tg
    | "9_2" -> Some TgDeg
    | "0_1" -> Some Ctg
    | "0_2" -> Some CtgDeg
    | _ -> None

let applyUnaryOperation (operation: Operation) : double -> double =
    match operation with
    | SquareRoot -> squareRoot
    | Sin -> sin
    | SinDeg -> sinDeg
    | Cos -> cos
    | CosDeg -> cosDeg
    | Tg -> tg
    | TgDeg -> tgDeg
    | Ctg -> ctg
    | CtgDeg -> ctgDeg
    | _ -> failwith "Invalid operation"

let applyBinaryOperation (operation: Operation) : double -> double -> double =
    match operation with
    | Add -> add
    | Subtract -> subtract
    | Multiply -> multiply
    | Divide -> divide
    | Power -> power
    | _ -> failwith "Invalid operation"

let rec runCalculator () =
    printMenu ()
    Console.Write("Input operation number: ")
    let choice = Console.ReadLine()

    match parseOperation choice with
    | None -> Console.WriteLine("Exit...")
    | Some operation ->
        try
            match operation with
            | SquareRoot
            | Sin
            | SinDeg
            | Cos
            | CosDeg
            | Tg
            | TgDeg
            | Ctg
            | CtgDeg ->
                Console.Write("Input number: ")

                match parseDouble (Console.ReadLine()) with
                | Some x ->
                    let f = applyUnaryOperation operation
                    let result = f x
                    Console.WriteLine($"Result: %.4f{result}")
                | None -> Console.WriteLine("Incorrect input")
            | _ ->
                Console.Write("Input first number: ")
                let number1 = parseDouble (Console.ReadLine())
                Console.Write("Input second number: ")
                let number2 = parseDouble (Console.ReadLine())

                match number1, number2 with
                | Some x, Some y ->
                    let f = applyBinaryOperation operation
                    let result = f x y
                    Console.WriteLine($"Result: %.4f{result}")
                | _ -> Console.WriteLine("Incorrect input")
        with e ->
            Console.WriteLine($"Error: {e.Message}")

        Console.WriteLine("\n-------------------------------------------------------------\n")

        runCalculator ()

[<EntryPoint>]
let main (argv: string[]) : int =
    runCalculator ()
    0
