const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// User takes in username, password
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    testData: [{ type: Schema.Types.ObjectId, ref: 'TestData' }],
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
}, {
    timestamps: true,
});

// Static belongs to the full ORM
UserSchema.static({
    findByUsername: function (username) {
        try {
            return this.find({ username });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    findOneByUsername: function (username) {
        try {
            return this.findOne({ username });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
});

// // Methods belongs to an INSTANCE of the collection
UserSchema.method({
    sayMyUsername: function () {
        console.log(`I AM ${this.username}`);
    },
    comparePassword: async function (candidatePassword) {
        // console.log('this in compare password', this);
        try {
            return await bcrypt.compare(candidatePassword, this.password);
        } catch (e) {
            throw new Error(e);
        }
    },
});

UserSchema.pre('save', async function (next) {
    // console.log('I am the this in pre hook', this);
    const user = this;
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        } catch (e) {
            next(e);
        }
    }
    next();
});

const User = model('User', UserSchema);

module.exports = User;