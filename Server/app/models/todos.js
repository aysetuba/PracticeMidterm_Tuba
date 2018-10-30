var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    todo: { type: String, require:true},
    priority: {type: String, enum:['Critical','High','Medium','Low'], require:true},
    dateDue: {type:Date, default:Date.now},
    
});

module.exports = Mongoose.model('Todo', todoSchema);
