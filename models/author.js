var mongoose = require('mongoose');

var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function(){
let dob = "unknown";
let dod = "";
if(this.date_of_birth){
	dob = moment(this.date_of_birth).format('MMM do, YYYY');
}
if(this.date_of_death){
	dod = moment(this.date_of_death).format('MMM do, YYYY');
}
return dob + ' - ' + dod;
});
// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);