const { Schema, Types} = require('mongoose');//Import the Schema and Types objects from the 'mongoose' library

const ReactionSchema = new Schema({//Declare a new constant named ReactionSchema and assign a new instance of the Schema object to it
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {//Define a field named reactionBody
        type: String, //string
        required: true, //it is required
        maxlength: 280 //max character is 280 or less
    },
    username: { 
        type: String,// username is string and it is required
        required: true
    },
    createdAt: {
        type: Date,// type is date 
        default: Date.now//currtent date
    }
});

module.exports = ReactionSchema;
