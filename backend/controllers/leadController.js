const User = require("../models/User");
const Leads = require("../models/Leads")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllLeads = async (req, res) => {
    try {
        // Fetch all leads - find() always returns an array
        const leads = await Leads.find({});
        
        // Explicitly ensure we're working with an array
        const leadsArray = Array.isArray(leads) ? leads : [leads];
        
        // Return the array with success status
        res.status(200).json({
            success: true,
            message: "Leads fetched successfully",
            count: leadsArray.length,
            data: leadsArray  // Explicit array of leads
        });
        
    } catch (error) {
        console.error("Fetch Leads Error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching leads",
            error: error.message,
            data: []  // Explicit empty array on error
        });
    }
};

exports.updateLeadPriority = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { priority } = req.body; // Expecting { priority: "high" }

    // Validate priority value
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority value"
      });
    }

    const updatedLead = await Leads.findByIdAndUpdate(
      leadId,
      { priority },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Priority updated successfully",
      data: updatedLead
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating priority",
      error: error.message
    });
  }
};

 
