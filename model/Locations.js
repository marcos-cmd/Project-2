const { Schema, model, } = require('mongoose');
const { Point } = require('mapbox-gl');

// Foreign Key

const LocationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'location name is required']
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Location = model('Location', LocationSchema);


module.exports = Location;
