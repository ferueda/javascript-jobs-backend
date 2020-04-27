const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const jobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: String,
  location: {
    type: String,
    required: true,
  },
  salary: String,
  timestamp: {
    type: Number,
    required: true,
  },
  company_rating: String,
  apply_link: {
    type: String,
    required: true,
  },
  content_html: {
    type: String,
    required: true,
  },
  content_text: {
    type: String,
    required: true,
  },
  indeed_id: {
    type: String,
    required: true,
    unique: true,
  },
  query_city: String,
  tags: Array,
});

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

jobSchema.plugin(uniqueValidator);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
