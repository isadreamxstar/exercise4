'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gif Schema
 */
var GifSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Gif name',
		trim: true
	},
    image: {
        type: String,
        default: ''
        },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	views: {
		type: Number,
		default: 0
	},
	likes: {
		type: Number,
		default: 0
	}
});

mongoose.model('Gif', GifSchema);