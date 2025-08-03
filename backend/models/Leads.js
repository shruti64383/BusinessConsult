import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  // Auto-incremented unique ID
  leadId: {
    type: Number,
    unique: true
  },
  
  // Required fields
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^[\d\s\-()+]{10,20}$/, 'Please use a valid phone number']
  },
  
  // Service details
  service: {
    type: String,
    enum: ['Web Development', 'Consulting', 'Marketing', 'Design', 'Other'],
    required: true
  },
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative']
  },
  
  // Automatic timestamp
  date: {
    type: Date,
    default: Date.now
  },
  
  // Additional info
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['New', 'Contacted'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  
  // Business info
  business: {
    name: String,
    industry: String,
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large', 'Enterprise']
    }
  }
});

// Auto-increment leadId
leadSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'leadId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.leadId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead