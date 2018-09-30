class Calculator {

    constructor(id) {
        this.calcElem = document.getElementById(id);
        this.inputDisplay = this.calcElem.querySelector('.calc-display-result');
        this.formulaDisplay = this.calcElem.querySelector('.calc-display-formula');
        this.formula = '';
        this.result = 0; //посчитанное
        this.inputLast = 0; //предыдущее введенное
        this.input = '0'; //текущее введенное
        this.operation = '+';
        //this.opFlag = 0;
    }

    refreshDisplays() {
        this.inputDisplay.innerHTML = formatComma(this.input);
        this.formulaDisplay.innerHTML = formatComma(this.formula);

        function formatComma(str) {
            let newString = str.slice();
            while (~newString.indexOf('.')) {
                newString = newString.replace('.', ',');
            }
            return newString;
        }
    }

    calculate() {
        //if(!this.opFlag) {
            switch (this.operation) {
                case '+':
                    this.result += +this.input;
                    break;
                case '-':
                    this.result -= +this.input;
                    break;
                case '*':
                    this.result *= +this.input;
                    break;
                case '/':
                    this.result /= +this.input;
                    break;
                default:
                    break;
            }
        //}
    }

    addOperation(op) {

            switch (op) {
                case '+':
                case '-':
                case '*':
                case '/':
                    this.calculate();
                    this.operation = op;
                    // if(this.opFlag) {
                    //     this.formula = this.formula.slice(0,-2);
                    //     this.formula += this.operation + ' ';
                    // }
                    // else {
                        this.formula += this.input + ' ' + this.operation + ' ';
                        //this.opFlag = 1;
                    //}

                    this.inputLast = this.input;
                    this.input = '' + this.result;
                    break;
                case '=':
                    this.calculate();
                    this.input = '' + this.result;
                    this.result = 0;
                    this.formula = '';
                    this.operation = "+";
                    break;
                default:
                    this.process(op);
                    this.calculate();
                    break;
            }
            this.refreshDisplays();
            if(op !== '=') this.input = '';
    }

    equate() {
        this.calculate();
        this.input = '' + this.result;
        this.result = 0;
        this.formula = '';
        this.refreshDisplays();
        //this.formula = this.input;
        //this.opFlag = 0;
    }

    process(op) {
        switch (op) {
            case '1/x':
                this.formula += '1/(' + this.input + ')';
                this.input = '' + (1 / +this.input);
                break;
            case 'sqr':
                this.formula += 'sqr(' + this.input + ')';
                this.input = '' + (+this.input * +this.input);
                break;
            case 'sqrt':
                this.formula += 'sqrt(' + this.input + ')';
                this.input = '' + (Math.sqrt(+this.input));
                break;
            case '%':
                this.input = '' + (this.result * +this.input / 100);
                this.formula += '' + this.input;
                break;
            default:
                break;
        }
        //this.opFlag = 0;
    }

    addDigit(digit) {
        if (!isNaN(digit)) {
            (this.input === '0') ? this.input = '' + digit : this.input += '' + digit;
            //this.opFlag = 0;
        }
        this.refreshDisplays();
    }

    addComma() {
        if (!~this.input.indexOf('.')) this.input += '.';
        //this.opFlag = 0;
        this.refreshDisplays();
    }

    removeDigit() {
        if (this.input !== '0') {
            this.input = this.input.slice(0, -1);
            if (!this.input.length) this.input = '0';
        }
        this.refreshDisplays();
    }

    negate() {
        if(this.input) {
            (~this.input.indexOf('-')) ? this.input = this.input.slice(1) : this.input = '-' + this.input;
            this.refreshDisplays();
        }
    }

    clearEntry() {
        this.input = '0';
        this.refreshDisplays();
    }

    clearData() {
        this.formula = '';
        this.result = 0;
        this.input = '0';
        //this.opFlag = 0;
        this.refreshDisplays();
    }

}

const calc = new Calculator('calc');