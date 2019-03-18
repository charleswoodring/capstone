export default  {
    newEntry(date, odometer, price, gallons) {
        console.log(`On ${date} you entered ${odometer} miles. You pumped ${gallons} at ${price} per gallon.`)
        console.table({
            date: Date,
            odometer: odometer,
            price: price,
            gallons: gallons
        })
    }
};