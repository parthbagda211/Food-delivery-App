const mongoose = require('mongoose');


// const mongoose = require('mongoose')

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURL)

        console.log(`MongDB Connected: ${conn.connection.host}.cyan.underline`);
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function (err, data) {

            const foodCategory = await mongoose.connection.db.collection("foodCategory");

            foodCategory.find({}).toArray(function (err, catData) {
                if (err) console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                }
            })

            // if (err) console.log(err);
            // else{
            //     global.food_items = data;       //global variable : can access from anywhere in application
            //     // console.log(global.food_items);
            // }
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// module.exports = connectDB

module.exports = mongoDB;
