const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const db = require('.');
const seedDb = async () => {
    //Creating and saving to database
    mongoose.connect('mongodb+srv://Admin:0lahPE5mSrUPLMQW@project3.k3mvo.mongodb.net/Project3?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Yee'))
        .catch(e => console.log(e));
    mongoose.set('debug', true);
    try {
        await db.User.deleteMany({});
        await db.TestData.deleteMany({});
        await db.Location.deleteMany({});
​
        // Way #1
        const bob = new db.User({
            username: 'Bob',
            password: 'ayhusgdasuyidga',
        });
        const practiceTest = new db.TestData({
            testDate: '10/10/10',
            testResult: 'Negative'
        });
        const practiceLocation = new db.Location({
            name: 'Market',
            location: {
                type: "Point",
                coordinates: [-122.23421, 37.32455]
            },
        })
        // When the data is actually saved to the database
        await bob.save();
        await practiceTest.save();
        await practiceLocation.save();
        //   Way #2
        //  Data is saved to the database right away
        const alice = await db.User.create({
            username: 'Alice',
            password: 'ahbdpiauydghadas'
        });
        await bob.save();
        // const foundAlice = await db.User.findOneByUsername('Alice');
        // foundAlice.sayMyUsername();
        // alice.hobbies.push('debugging');
        // alice.hobbies.push('coding');
        //
        // alice.hobbies = alice.hobbies.filter(hobby => hobby === 'coding');
        // await alice.save();
        // console.log(alice);
        // const deleted = await db.Chameleon.findByIdAndDelete(grilledCheese2._id);
        // console.log('grilled cheese 2', deleted);
        //
        // const otherGrilledCheese = await db.Chameleon.findOneAndDelete({ name: 'Grilled Cheese' }, {
        //   select: 'name'
        // });
        // console.log('all the other grilled', otherGrilledCheese);
        // alice = await db.User.findByIdAndUpdate(alice._id, {
        // username: 'Wonderland',
        // $pull: {
        //   hobbies: ['debugging', 'coding'],
        // },
        // // $addToSet: {
        // //   hobbies:['coding', 'swimming', 'nunchucking', 'coding'],
        // //   chameleons: [grilledCheese._id, grilledCheese2._id, grilledCheese._id],
        // // },
        //   // hobbies: {$push: ['coding', 'swimming', 'nunchucking']},
        //   // Add to set makes it so that if the data is already in the array, it doesn't add it
        //   //  Push makes it so that if the data is already in there, it still adds it
        //   // chameleons: {push: [ grilledCheese._id, grilledCheese2._id ]},
        // },{
        //   new: true,
        // });
        // console.log(alice);
        // const manny = await db.User.find({ username: 'Manny' }, 'username hobbies chameleons createdAt').populate('chameleons');
        // console.log(JSON.stringify(manny, null, 2));
        // console.log(manny.chameleons);
        // grilledCheese = await db.Chameleon.findById(grilledCheese._id).populate({ path: 'owner', select: 'username'});
        // find all chameleons
        // const selectCham = await db.Chameleon.find({
        //   $ni: [{ name: 'Chamillionaire', }, { age: 1 }]
        // });
        // const ninChams = await db.Chameleon.find({
        //   age: { $in: [1, 2] }
        // });
        //
        // console.log(ninChams);
        // const allChams = await db.Chameleon.find({}, 'name age isHungry').populate('owner');
    } catch (e) {
        console.log(e);
    }
};
seedDb()
    .then(() => process.exit(0))
    .catch(e => console.log(e));