const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Language = require("../models/language");
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const totalItems = await Category.countDocuments();

    if (!totalItems || totalItems === 0) {
      return res.json({
        data: [],
        page,
        size,
        totalPages: 0,
        totalItems: 0,
      });
    }

    const categories = await Category.find()
      .populate("language")
      .skip((page - 1) * size)
      .limit(size);

    const totalPages = Math.ceil(totalItems / size);

    res.json({
      data: categories,
      page,
      size,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/language/languageId", async (req, res) => {
  try {
    //console.log("Received languageId:", req.query.languageId);
    if (!mongoose.Types.ObjectId.isValid(req.query.languageId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const languageId = new mongoose.Types.ObjectId(req.query.languageId);

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const totalItems = await Category.countDocuments({ language: languageId });

    if (!totalItems || totalItems === 0) {
      return res.json({
        data: [],
        page,
        size,
        totalPages: 0,
        totalItems: 0,
      });
    }

    const categories = await Category.find({ language: languageId })
      .populate("language")
      .skip((page - 1) * size)
      .limit(size);

    const totalPages = Math.ceil(totalItems / size);

    res.json({
      data: categories,
      page,
      size,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "language"
    );
    if (category == null) {
      return res.status(404).json({ message: "No category" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { image, name, tag, language } = req.body;

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!tag || typeof tag !== "string") {
      return res.status(400).json({ message: "Invalid tag" });
    }
    if (!language._id || !mongoose.Types.ObjectId.isValid(language._id)) {
      return res.status(400).json({ message: "Invalid language Id" });
    }
    const category = new Category({
      image: image,
      name: name,
      language: language,
      tag: tag,
    });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const id = new mongoose.Types.ObjectId(req.params.id);
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }

    const { image, name, tag, language } = req.body;

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!tag || typeof tag !== "string") {
      return res.status(400).json({ message: "Invalid tag" });
    }
    if (!language._id || !mongoose.Types.ObjectId.isValid(language._id)) {
      return res.status(400).json({ message: "Invalid language Id" });
    }
    category.image = image;
    category.name = name;
    category.language = language;
    category.tag = tag;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "No category" });
    }

    const { image, name, tag, language } = req.body;

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!tag || typeof tag !== "string") {
      return res.status(400).json({ message: "Invalid tag" });
    }
    if (!language._id || !mongoose.Types.ObjectId.isValid(language._id)) {
      return res.status(400).json({ message: "Invalid language Id" });
    }

    category.image = image;
    category.name = name;
    category.language = language;
    category.tag = tag;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const id = new mongoose.Types.ObjectId(req.params.id);

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "No category found to delete" });
    }

    res.json({ message: "category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
