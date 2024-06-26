//declaring the state variables
const balanceText = document.querySelector('#Balance')
const totalIncomeText = document.querySelector('.total-income')
const totalExpenseText = document.querySelector('.total-expense')
const list = document.querySelector('.list')


// let transactions = 
//     localStorage.getItem("expense-app")

const form = document.querySelector('#form')
const description = document.querySelector('#desc');
const amount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(
    localStorage.getItem("expense-app")
);

//creating variables that would hold transactions
let transactions = 
    localStorage.getItem("expense-app") === null ? [] :localStorageTransactions;
//create a function that collects the transaction amount and the description of the transaction which is populate the transactions array. but this event would only occur when the Add Transaction btn is clicked which triggers a subit event
 form.addEventListener('submit', addTransaction);
updateDOM();
// initialize the app
initializeApp();
 //once the submit event is triggered js paases the event method that gives details about the form.
 function addTransaction(e){
    e.preventDefault();
// preventing blank transaction detail submission
    if (description.value.trim() === '' || amount.value.trim() =='') {
        alert ("Description amount cannot be empty");
    } else {
        //the addTransaction stores the description and amount into an array of object. we create the object, which is a transaction and then  push to the transactions array
        const transaction = {
            id : Math.floor(Math.random() * 100000000000),
            desc : description.value,
            amount : +amount.value,
            // The plus sign removes any effect of string on numbers
         }
        //pushing object into the transcation Array
        transactions.push(transaction);
        // SAVING IN A LOCAL STORAGE
        updateLocalStorage();
        //calling the function that addsTransactions to DOM (HTML) after the push method. since the transaction method is needed by the addTransactionToDOM(), we  can pass the need object into the call to the function. thus it becomes
        addTransactionToDOM(transaction)

        //calling the updatevalue function
        updateValues() 
        description.value = "";
        amount.value = "";
        // let total = transactions.reduce((acc, n) => { 
        //     return acc += n.amount;
        // }, 0);
        // console.log(total);   
        // this is used to send the total to balance  
    }
    //since the transaction object has been called into addTransactionToDOM(transaction) we have to prepare the function to receive it as a parameter.. which could be anything inside the parenthesis. 

 }
 function addTransactionToDOM (transaction){
    //comparing transaction amount to zero in order to identify income and expenses.
    let sign = '';
    const item = document.createElement('li')
    // const className =''

    if (transaction.amount < 0){
        sign = "-";
        item.classList.add('minus')
        // className = 'minus'
    }else {
        sign = "+";
        // className = 'plus'
        item.classList.add('plus')
    }
    // transaction.amount < 0 ? sign="-" : sign = "+"

     //creating the li which holds each transaction
    
    // we want to append a class of either "minus" or "plus" into each transaction item inorder to allow the if statement to add the class name of plus or minus.

    item.innerHTML = `<button onclick="removeTransaction(${transaction.id})" class="delete-btn">x</button> ${transaction.desc} <span>${sign}${Math.abs(transaction.amount)}</span> `

    //append transaction item to the ul
    list.appendChild(item)
    

}
//after ever transaction we update the totalbalance, totalincome and totalexpense by using an updateValue function
function updateValues () {
    //using the map method to select only the amount out of each transact
    const amounts = transactions.map((transaction)=> {
        return transaction.amount;
    })
    const totalBal = amounts.reduce((previousValue, currentValue) => {
        return (previousValue += currentValue)
    }, 0).toFixed(2);
    // console.log("total balance", total);
    const totalIncome = amounts.filter((amount) => {
    return amount > 0
    }).reduce((incomeBal, currVal) => {
        return incomeBal += currVal}, 0).toFixed(2);

    balanceText.innerText = totalBal;
    totalIncomeText.innerText = totalIncome;

    
    // console.log("total balance", total);
    const totalExpense = amounts.filter((amount) => {
    return amount < 0
    }).reduce((incomeBal, currVal) => {
        return incomeBal += currVal}, 0).toFixed(2);
        // this is used to get all the negative values inputed into the li
    balanceText.innerText = totalBal;
    totalExpenseText.innerText = totalExpense;
    console.log(totalExpense);
}



//Assignment
//use the reduce to add up all the amounts in the amounts array, store it in a variable called total = balance

//use the filter and reduce method to add up all positive numbers from the amounts array. stor ethos varian

function removeTransaction(transactionId){
    transactions = transactions.filter((transaction) => {
        return transaction.id !== transactionId;
    });
    updateLocalStorage();
    updateDOM()
    // this collects the data from the updateDOM function and executes it on the transactions
}

function updateDOM(){
    list.innerHTML = "";
    transactions.forEach(addTransactionToDOM);
    updateValues();
    // this function collects the data and passes it as an output  
}
// storing in data base
function updateLocalStorage(){
    localStorage.setItem("expense-app",JSON.stringify(transactions));
};