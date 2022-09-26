// class Cal
class Calculator{
    constructor(previousDisplay, currentDisplay){
        this.previousDisplay = previousDisplay
        this.currentDisplay = currentDisplay
        this.clear()
    }

    clear(){
        this.previousEl = ''
        this.currentEl = ''
        this.operator = undefined
    }

    delete(){
        this.currentEl = this.currentEl.toString().slice(0, -1)
    }

    extend(num){
        if(num === '.' && this.currentEl.includes('.')) return
       
        this.currentEl = this.currentEl.toString() + num.toString()
        
    }
    selectOperator(operator){
        if(this.currentEl === '')return 
        if(this.previousEl !== ''){
            this.compute()
        }
        this.operator = operator
        this.previousEl = this.currentEl
        this.currentEl = ''
    }
    compute(){
        let result
        let prev = parseFloat(this.previousEl)
        let current = parseFloat(this.currentEl)
        if(isNaN(prev) || isNaN(current)){
            return
        }
        switch(this.operator){
            case '+':
                result = prev + current
                break;
            case '-':
                result = prev - current
                break;
            case '*':
                result = prev * current
                break;
            case '/':
                result = prev / current
                break
            default:
                return

        }
        this.currentEl = result
        this.operator = undefined
        this.previousEl = ''
    }

    display(num){
        let strNum = num.toString()
        let intNum = parseFloat(strNum.split('.')[0])
        let decNum = strNum.split('.')[1]
        let intDisplay 
      
        if(isNaN(intNum)){
            intDisplay = ''
        } 
        else {
            intDisplay = intNum.toLocaleString('de-DE')
        }
        

        if(decNum != null){
            return `${intDisplay}.${decNum}`
        } else {
            return intDisplay
        }
    }

    update(){
        this.currentDisplay.innerText = this.display(this.currentEl)

        if(this.operator != null){
            this.previousDisplay.innerText = `${this.display(this.previousEl)} ${this.operator}`
        } else {
            this.previousDisplay.innerText = ''
        }
    }
}

//declare variables
const operators = document.querySelectorAll('.operator')
const numbers = document.querySelectorAll('.number')
const clear = document.querySelector('.clear-btn')
const decimal = document.querySelector('.decimal-btn')
const del = document.querySelector('.delete-btn')
const equal = document.querySelector('.equal-btn')
const previousDisplay = document.querySelector('.previous__display')
const currentDisplay = document.querySelector('.current__display')


const cal = new Calculator(previousDisplay, currentDisplay)

// operators
operators.forEach((button) =>(
    button.onclick = () =>{
       cal.selectOperator(button.innerText)
       cal.update()
    }
))
// numbers
numbers.forEach((button) =>(
    button.onclick = () =>{
        cal.extend(button.innerText)
        cal.update()
        
    }
))
// del
del.onclick = () =>{
    cal.delete()
    cal.update()
 }
// clear
 clear.onclick = () =>{
    cal.clear()
    cal.update()
}
// equal
equal.onclick = () =>{
    cal.compute()
    cal.update()
 }



   


   
