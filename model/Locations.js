const { Schema, model, } = require('mongoose');

// Location take in name, latitude, longitude
const LocationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'location name is required']
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    // each datapoint expires after 10 days
    expire_at: { type: Date, default: Date.now, expires: 864000 },
}, { timestamps: true });

const Location = model('Location', LocationSchema);

module.exports = Location;