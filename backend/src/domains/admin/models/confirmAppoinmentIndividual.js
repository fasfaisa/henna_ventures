const mongoose = require("mongoose");

const ConfirmAppoinmentIndividualSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  wedding: {
    type: String,
    required: true,
  },
  type_mehendi: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },
  mehendi_on: {
    type: String,
    required: true,
  },
  mehendi_for: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "DECLINED", "COMPLETED"],
    default: "PENDING",
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  appointment_type: {
    type: String,
    enum: ["individual", "package"],
    default: "individual",
    required: true,
  },
});

module.exports = mongoose.model(
  "confirmappoinmentindividual",
  ConfirmAppoinmentIndividualSchema
);
