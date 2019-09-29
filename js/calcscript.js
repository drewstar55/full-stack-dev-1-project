class Calculator {
  constructor(prevOpTxt, currOpTxt) {
    this.prevOpTxt = prevOpTxt
    this.currOpTxt = currOpTxt
    this.clear()
  }

  clear() {
    this.currOp = '0'
    this.prevOp = ''
    this.operation = undefined
  }

  delete() {
    this.currOp = this.currOp.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currOp.includes('.')) return
    this.currOp = this.currOp.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currOp === '') return
    if (this.prevOp !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevOp = this.currOp
    this.currOp = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevOp)
    const current = parseFloat(this.currOp)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
    }
    this.currOp = computation
    this.operation = undefined
    this.prevOp = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let intDisplay
    if (isNaN(integerDigits)) {
      intDisplay = ''
    } else {
      intDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${intDisplay}.${decimalDigits}`
    } else {
      return intDisplay
    }
  }

  updateDisplay() {
    this.currOpTxt.innerText =
      this.getDisplayNumber(this.currOp)
    if (this.operation != null) {
      this.prevOpTxt.innerText =
        `${this.getDisplayNumber(this.prevOp)} ${this.operation}`
    } else {
      this.prevOpTxt.innerText = ''
    }
  }
}

const numButtons = document.querySelectorAll('[btn-num]')
const operationButtons = document.querySelectorAll('[btn-op]')
const equalsButton = document.querySelector('[btn-equals]')
const deleteButton = document.querySelector('[btn-delete]')
const allClearButton = document.querySelector('[btn-all-clear]')
const prevOpTxt = document.querySelector('[data-prev-op]')
const currOpTxt = document.querySelector('[data-curr-op]')

const calculator = new Calculator(prevOpTxt, currOpTxt)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
