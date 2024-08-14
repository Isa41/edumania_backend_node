const express = require("express");
const router = express.Router();
const Language = require("../models/language");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const languages = await Language.find()
      .skip((page - 1) * size)
      .limit(size);

    const totalItems = await Language.countDocuments();
    const totalPages = Math.ceil(totalItems / size);

    res.json({
      data: languages,
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
    const language = await Language.findById(req.params.id);
    if (language == null) {
      return res.status(404).json({ message: "No language" });
    }
    res.json(language);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { image, name, languageCode } = req.body;
    console.log("post body: " + image);

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!languageCode || typeof languageCode !== "string") {
      return res.status(400).json({ message: "Invalid languageCode" });
    }

    const language = new Language({
      image: image,
      name: name,
      languageCode: languageCode,
    });
    const newLanguage = await language.save();
    res.status(201).json(newLanguage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const id = new mongoose.Types.ObjectId(req.params.id);

    const language = await Language.findById(id);

    if (!language) {
      return res.status(404).json({ message: "No language" });
    }

    const { image, name, languageCode } = req.body;
    console.log("Image:" + image);

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!languageCode || typeof languageCode !== "string") {
      return res.status(400).json({ message: "Invalid languageCode" });
    }
    language.image = image;
    language.name = name;
    language.languageCode = languageCode;

    const updatedLanguage = await language.save();
    res.json(updatedLanguage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);

    if (!language) {
      return res.status(404).json({ message: "No language" });
    }

    const { image, name, languageCode } = req.body;

    if (!image || typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid  name" });
    }
    if (!languageCode || typeof languageCode !== "string") {
      return res.status(400).json({ message: "Invalid languageCode" });
    }
    language.image = image;
    language.name = name;
    language.languageCode = languageCode;

    const updatedLanguage = await language.save();
    res.json(updatedLanguage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const id = new mongoose.Types.ObjectId(req.params.id);

    const language = await Language.findByIdAndDelete(id);

    if (!language) {
      return res.status(404).json({ message: "No language found to delete" });
    }

    res.json({ message: "Language deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
