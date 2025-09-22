import path from 'node:path';
import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import parseStringToArray from './my_module/parseAddMultiplyStrings.js';
import { add, subtract, multiply, division } from './my_module/calculator.js';
import chalk from 'chalk';
import parseSubDivideStrings from './my_module/parseSubDivideStrings.js';


const rl = createInterface({ 
        input: stdin,
        output: stdout,
    });

const displayMenu = () => {

    console.log(chalk.bgBlue.white.bold(`\n\t Calculator App (${path.basename(import.meta.url)}) \n`));

    console.log(chalk.yellowBright("What would you like to do?\n"));

    console.log(chalk.green("1.") + " " + chalk.white("Add numbers"));
    console.log(chalk.green("2.") + " " + chalk.white("Subtract two numbers"));
    console.log(chalk.green("3.") + " " + chalk.white("Multiply numbers"));
    console.log(chalk.green("4.") + " " + chalk.white("Divide two numbers"));
    console.log(chalk.red("5.") + " " + chalk.red("Exit\n"));


    rl.question(chalk.cyanBright('Pick a choice: '), (choice) => {
        
        switch (choice.trim()) {
            case "1":
                let addQuestion = 'Enter the numbers you want to add, separated by commas. e.g 2,3,4,5,6 : ';
                rl.question(chalk.cyan(addQuestion), (numbersRaw) => {
                    let numArray = parseStringToArray(numbersRaw);
                    let sum = add(numArray);
                    console.log(chalk.blueBright(`The sum of ${numArray} = ${sum}`));
                    
                    displayMenu();
                });
                
                
                break;
        
            case "2":
                rl.question(chalk.cyan("Enter the first number: "), (firstNum) => {
                    rl.question(chalk.cyan("Enter the second number: "), (secondNum) => {
                        firstNum = parseSubDivideStrings(firstNum);
                        secondNum =parseSubDivideStrings(secondNum);

                        if (!firstNum || !secondNum) {
                            console.log(chalk.red("Invalid entries. Only number digits accepted. Try again!"));
                        } else {
                            let result = subtract(firstNum, secondNum);
                            console.log(chalk.yellow(`The result of ${firstNum} - ${secondNum} = ${result}`));
                        }
                        
                        displayMenu();
                    });
                });
                break;
        
            case "3":
                let mulQuestion = 'Enter the numbers you want to multiply, separated by commas. e.g 2,3,4,5,6 : ';
                rl.question(chalk.cyan(mulQuestion), (numbersRaw) => {
                    let numArray = parseStringToArray(numbersRaw);
                    let product = multiply(numArray);
                    console.log(chalk.greenBright(`The product of ${numArray} = ${product}`));
                    displayMenu();
                });
                break;
        
            case "4":
                rl.question(chalk.cyan("Enter the first number: "), (firstNum) => {
                    rl.question(chalk.cyan("Enter the second number: "), (secondNum) => {
                        firstNum = parseSubDivideStrings(firstNum);
                        secondNum =parseSubDivideStrings(secondNum);

                        if (!firstNum || !secondNum) {
                            console.log(chalk.red("Invalid entries. Only number digits accepted. Try again!"));
                        } else {
                            let result = (firstNum / secondNum).toFixed(2);
                            console.log(chalk.cyanBright(`The result of ${firstNum} / ${secondNum} = ${result}`));
                        };
                        displayMenu();
                    });
                });
                break;
        
            case "5":
                rl.question(chalk.red("Are you sure you want to exit? [y/n]: "), (response) => {
                    if (response.trim().toLowerCase() === 'y') {
                        console.log(chalk.bgGreenBright.bold("Thanks for using Calculator App, Goodbye!"));
                        
                        rl.close();
                        process.exit(0);
                    } else {
                        displayMenu();
                    }
                });
                break;
        
            default:
                console.log(chalk.bgRed("Invalid option selected. Try again!"));
                displayMenu();
                break;
        }
        
    });


};

displayMenu()
