const { Schema, model, } = require('mongoose');

// Test dates take in test date, and test result
const TestDataSchema = new Schema({
    testDate: {
        type: Date,
        required: [true, 'Test Date is required']
    },
    testResult: {
        type: String,
        trim: true,
        enum: ['Positive', 'Negative'],
        required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const TestData = model('TestData', TestDataSchema);

module.exports = TestData;