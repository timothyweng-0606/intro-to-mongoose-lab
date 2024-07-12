const { addCustomer, getAllCustomers, connect, updateCustomer, deleteCustomer } = require('./server');
const mongoose = require('mongoose');  
const prompt = require('prompt-sync')();

console.log('Welcome to the CRM')

const main = async () => {
    await connect();

let continueRunning = true
while(continueRunning){
    const value = prompt('What would you like to do?\n1. Create a customer\n2. View all customers\n3. Update a Customer\n4. Delete a customer\n5. Exit\n\n');
    let name = ''
    let age  = ''
    if(value === "1"){
        while (name === '' || age === '') {
            if (name === '') {
                name = prompt('What is the new customer\'s name? ');
                if (name === '') {
                    console.log('Name cannot be empty. Please enter a valid name.');
                }
            }
            if (age === '') {
                age = prompt('What is the new customer\'s age? ');
                if (age === '') {
                    console.log('Age cannot be empty. Please enter a valid age.');
                }
            }
        }
        await addCustomer(name, age)
        console.log('New Customer has been added')
    }
    
    else if(value === "2"){
            const customers = await getAllCustomers()
            customers.forEach((customer) => {
                console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`)
            })
        }
    else if(value === '3'){
        const customers = await getAllCustomers()
        console.log('Below is a list of customers: ')
        customers.forEach((customer) => {
            console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`)
        })
        
        const id = prompt('Copy and paste the id of the customer you would like to update here: ')
        //insert error handling later
        const name = prompt('What is the customers new name ?')
    
        const age = prompt('What is the customers new age ?')
    
        await updateCustomer(id,name,age)
    }
    else if(value === '4'){
        const id = prompt('Copy and paste the id of the customer you would like to delete: ')
        
        try{
            await deleteCustomer(id)
            console.log('Delete Successful !')
        }
        catch (error){
            console.log(`Invalid ID: ${error}`)
        }
    }
    else if (value === "5") {
        continueRunning = false;
        console.log('Exiting...')
    } 
    else {
        console.log('Invalid option, please try again.');
    }
}
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}

main()


