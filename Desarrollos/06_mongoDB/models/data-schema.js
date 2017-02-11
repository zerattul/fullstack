/**
 * Created by salvadorcarreonbriseno on 03/02/17.
 */
'use strict';

const mongoose = require('./model'),
      Schema = mongoose.Schema,
      DataSchema = new Schema({
              _id : Schema.Types.ObjectId,
              name : String,
              twitter : String,
              email : String,
              country : String
          },
          {
              collection : 'data'
          }),
      Data = mongoose.model('Data', DataSchema);

module.exports = Data;