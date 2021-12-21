const { Schema, model  } = require('mongoose');

/**
 * colecicones de los eventos
 */
const eventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    }
});

eventSchema.method("toJSON", function () {
      const  { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;

})

module.exports = model('Events', eventSchema);