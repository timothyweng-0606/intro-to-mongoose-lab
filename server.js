
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await runQueries()
    
    // await mongoose.disconnect();
    // console.log('Disconnected from MongoDB');
    // process.exit();
};

const runQueries = async () => {
  console.log('Queries running.')
};

const Customer = require('./models/customer.js')

const addCustomer = async(name, age) => {
    const customerData = [
        { name: name, age: age },
];

    const customer = await Customer.create(customerData);
    // console.log("New customer:", customer);
  };


const getAllCustomers = async() => {//since we are using the find method it will holds an array of the info
    const allCustomers = await Customer.find({})
    return allCustomers
}

const updateCustomer = async(id,name,age) => {
    const specificCustomer = await Customer.findByIdAndUpdate(id, {name, age})
    return specificCustomer
}

const deleteCustomer = async(id) => {
    const specificCustomer = await Customer.findByIdAndDelete(id)
    return specificCustomer
}

module.exports = {
    connect,
    addCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
};
