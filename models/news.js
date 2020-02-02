
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = mongoose.Schema({
    title: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    category: String,
    poster: { type: Schema.Types.ObjectId, ref: 'User' },
    mainImageUrl: String,
    summaryText: String,
    contentList: [
        {
            content: String,
            type: {
                type: String,
                enum: ["image","video","text"]
            },
            order: Number
        }
    ]
});

module.exports = mongoose.model("News", NewsSchema);