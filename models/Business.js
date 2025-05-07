const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  type: { type: String, default: "business", immutable: true },
  companyName: { type: String},
  email: { type: String, unique: true, required: true},
  password: { type:String, required: true },
});

// Password hash middleware.

BusinessSchema.pre("save", async function save(next) {
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

BusinessSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Business", BusinessSchema);


