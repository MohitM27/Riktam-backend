const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function seedAdminUser() {
  try {
    const existingAdmin = await User.findOne({
      username: process.env.ADMIN_USER_NAME,
    });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      name: "Admin User",
      username: process.env.ADMIN_USER_NAME,
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}
module.exports = seedAdminUser;
