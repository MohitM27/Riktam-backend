const Group = require("../models/group");
const User = require("../models/user");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: {
        $in: [req.user.id],
      },
    });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    // Check if group with same name already exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: "Group name already exists" });
    }
    // Check if all members exist
    const usersExist = await User.find({ _id: { $in: members } });
    if (usersExist.length !== members.length) {
      return res
        .status(400)
        .json({ message: "One or more members do not exist" });
    }
    const newGroup = await Group.create({ name, members });
    res.status(201).json(newGroup);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    // Check if group exists
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // Check if all members exist
    const usersExist = await User.find({ _id: { $in: members } });
    if (usersExist.length !== members.length) {
      return res
        .status(400)
        .json({ message: "One or more members do not exist" });
    }
    group.name = name;
    group.members = members;
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    await group.remove();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // Check if user exists
    const userExist = await User.findById(memberId);
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Check if user is already a member
    if (group.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group" });
    }
    group.members.push(memberId);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
