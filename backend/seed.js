// Run this after starting the backend to create demo data
// Usage: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const EmployeeProfile = require('./src/models/EmployeeProfile');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vouchsafe';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing demo data
    await User.deleteMany({ email: { $regex: /demo/ } });
    await EmployeeProfile.deleteMany({});

    // Create demo employees
    const password = await bcrypt.hash('demo123', 10);
    
    const emp1 = await User.create({
      name: 'John Plumber',
      email: 'demo.plumber@vouchsafe.com',
      password,
      role: 'EMPLOYEE',
      phone: '+1-555-0101',
      location: { lat: 40.7128, lng: -74.0060 }
    });

    await EmployeeProfile.create({
      userId: emp1._id,
      skills: ['plumber', 'pipe repair', 'drain cleaning'],
      trustScore: 85,
      completedJobs: 12,
      availability: true,
      lastActiveAt: new Date()
    });

    const emp2 = await User.create({
      name: 'Sarah Electrician',
      email: 'demo.electrician@vouchsafe.com',
      password,
      role: 'EMPLOYEE',
      phone: '+1-555-0102',
      location: { lat: 40.7580, lng: -73.9855 }
    });

    await EmployeeProfile.create({
      userId: emp2._id,
      skills: ['electrician', 'wiring', 'lighting'],
      trustScore: 92,
      completedJobs: 18,
      availability: true,
      lastActiveAt: new Date()
    });

    const emp3 = await User.create({
      name: 'Mike Carpenter',
      email: 'demo.carpenter@vouchsafe.com',
      password,
      role: 'EMPLOYEE',
      phone: '+1-555-0103',
      location: { lat: 40.7489, lng: -73.9680 }
    });

    await EmployeeProfile.create({
      userId: emp3._id,
      skills: ['carpenter', 'woodwork', 'furniture'],
      trustScore: 78,
      completedJobs: 9,
      availability: true,
      lastActiveAt: new Date()
    });

    // Create demo employer
    await User.create({
      name: 'Demo Employer',
      email: 'demo.employer@vouchsafe.com',
      password,
      role: 'EMPLOYER',
      phone: '+1-555-0200',
      location: { lat: 40.7305, lng: -73.9350 }
    });

    console.log('✅ Demo data seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Employee 1: demo.plumber@vouchsafe.com / demo123');
    console.log('Employee 2: demo.electrician@vouchsafe.com / demo123');
    console.log('Employee 3: demo.carpenter@vouchsafe.com / demo123');
    console.log('Employer: demo.employer@vouchsafe.com / demo123');

    await mongoose.connection.close();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
