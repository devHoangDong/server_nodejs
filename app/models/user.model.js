module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: String,
        name: String,
        email: String,
        email_verified_at: String,
        two_factor_secret: String,
        two_factor_recovery_codes: String,
        current_team_id: String,
        profile_photo_path: String,
        created_at: String,
        updated_at: String,
        fb_id: String,
        google_id: String,
        address: String,
        ward: String,
        district: String,
        province: String,
        gender: String,
        birthday: String,
        phone: String,
      },
    );
  
    schema.method("toJSON", function() {
      const {_id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };
  