const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    toUserId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    status: {
        type: String,
        required: true,
        enum: {
            values : ["ignore","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        }
    },
},{
    timestamps: true
})

connectionRequestSchema.index({fromUserId: 1, toUserId:1})

connectionRequestSchema.pre("save", function(){

    // check if teh from userId is same as toUserID

    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("Cannot Send Connection Request to Yourself")
    }
 
})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel