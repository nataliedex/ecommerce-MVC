const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  type: { type: String, default: "customer", immutable: true },
  firstName: { type: String},
  lastName: { type: String },
  email: { type: String, unique: true, required: true},
  password: { type:String, required: true },
});

// Password hash middleware.

CustomerSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Helper method for validating user's password.

CustomerSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Customer", CustomerSchema);


