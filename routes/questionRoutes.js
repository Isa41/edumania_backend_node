const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const Category = require("../models/category");
const Language = require("../models/language");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const questions = await Question.find()
      .populate("category")
      .populate("language")
      .skip((page - 1) * size)
      .limit(size);

    const totalItems = await Question.countDocuments();
    const totalPages = Math.ceil(totalItems / size);

    res.json({
      data: questions,
      page,
      size,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    const languageId = req.query.languageId;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const query = {
      category: categoryId,
      language: languageId,
    };

    const questions = await Question.find(query)
      .populate("category")
      .populate("language")
      .skip((page - 1) * size)
      .limit(size);

    const totalItems = await Question.countDocuments(query);
    const totalPages = Math.ceil(totalItems / size);

    res.json({
      data: questions,
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
    const question = await Question.findById(req.params.id)
      .populate("language")
      .populate("category");
    if (question == null) {
      return res.status(404).json({ message: "No question" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      word,
      meaning,
      example1,
      example2,
      example3,
      example4,
      exampleMeaning1,
      exampleMeaning2,
      exampleMeaning3,
      exampleMeaning4,
      language,
      category,
    } = req.body;

    if (!word || typeof word !== "string") {
      return res.status(400).send("Invalid image");
    }
    if (!meaning || typeof meaning !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!example1 || typeof example1 !== "string") {
      return res.status(400).json({ message: "Invalid example1" });
    }
    if (!example2 || typeof example2 !== "string") {
      return res.status(400).json({ message: "Invalid example2" });
    }
    if (!example3 || typeof example3 !== "string") {
      return res.status(400).json({ message: "Invalid example3" });
    }
    if (!example4 || typeof example4 !== "string") {
      return res.status(400).json({ message: "Invalid example4" });
    }
    if (!exampleMeaning1 || typeof exampleMeaning1 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning1" });
    }
    if (!exampleMeaning2 || typeof exampleMeaning2 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning2" });
    }
    if (!exampleMeaning3 || typeof exampleMeaning3 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning3" });
    }
    if (!exampleMeaning4 || typeof exampleMeaning4 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning4" });
    }
    if (!language || !(language instanceof Language)) {
      return res.status(400).json({ message: "Invalid language object" });
    }
    if (!category || !(category instanceof Category)) {
      return res.status(400).json({ message: "Invalid category object" });
    }
    const question = new Question({
      word: word,
      meaning: meaning,
      example1: example1,
      exampleMeaning1: exampleMeaning1,
      example2: example2,
      exampleMeaning2: exampleMeaning2,
      example3: example3,
      exampleMeaning3: exampleMeaning3,
      example4: example4,
      exampleMeaning4: exampleMeaning4,
      language: language,
      category: category,
    });
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
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
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "No question" });
    }

    const {
      word,
      meaning,
      example1,
      example2,
      example3,
      example4,
      exampleMeaning1,
      exampleMeaning2,
      exampleMeaning3,
      exampleMeaning4,
      language,
      category,
    } = req.body;

    if (!word || typeof word !== "string") {
      return res.status(400).send("Invalid image");
    }
    if (!meaning || typeof meaning !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!example1 || typeof example1 !== "string") {
      return res.status(400).json({ message: "Invalid example1" });
    }
    if (!example2 || typeof example2 !== "string") {
      return res.status(400).json({ message: "Invalid example2" });
    }
    if (!example3 || typeof example3 !== "string") {
      return res.status(400).json({ message: "Invalid example3" });
    }
    if (!example4 || typeof example4 !== "string") {
      return res.status(400).json({ message: "Invalid example4" });
    }
    if (!exampleMeaning1 || typeof exampleMeaning1 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning1" });
    }
    if (!exampleMeaning2 || typeof exampleMeaning2 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning2" });
    }
    if (!exampleMeaning3 || typeof exampleMeaning3 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning3" });
    }
    if (!exampleMeaning4 || typeof exampleMeaning4 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning4" });
    }
    if (!language || !(language instanceof Language)) {
      return res.status(400).json({ message: "Invalid language object" });
    }
    if (!category || !(category instanceof Category)) {
      return res.status(400).json({ message: "Invalid category object" });
    }

    question.word = word;
    question.meaning = meaning;
    question.example1 = example1;
    question.example2 = example2;
    question.example3 = example3;
    question.example4 = example4;
    question.exampleMeaning1 = exampleMeaning1;
    question.exampleMeaning2 = exampleMeaning2;
    question.exampleMeaning3 = exampleMeaning3;
    question.exampleMeaning4 = exampleMeaning4;
    question.language = language;
    question.category = category;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "No question" });
    }

    const {
      word,
      meaning,
      example1,
      example2,
      example3,
      example4,
      exampleMeaning1,
      exampleMeaning2,
      exampleMeaning3,
      exampleMeaning4,
      language,
      category,
    } = req.body;

    if (!word || typeof word !== "string") {
      return res.status(400).send("Invalid image");
    }
    if (!meaning || typeof meaning !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!example1 || typeof example1 !== "string") {
      return res.status(400).json({ message: "Invalid example1" });
    }
    if (!example2 || typeof example2 !== "string") {
      return res.status(400).json({ message: "Invalid example2" });
    }
    if (!example3 || typeof example3 !== "string") {
      return res.status(400).json({ message: "Invalid example3" });
    }
    if (!example4 || typeof example4 !== "string") {
      return res.status(400).json({ message: "Invalid example4" });
    }
    if (!exampleMeaning1 || typeof exampleMeaning1 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning1" });
    }
    if (!exampleMeaning2 || typeof exampleMeaning2 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning2" });
    }
    if (!exampleMeaning3 || typeof exampleMeaning3 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning3" });
    }
    if (!exampleMeaning4 || typeof exampleMeaning4 !== "string") {
      return res.status(400).json({ message: "Invalid exampleMeaning4" });
    }
    if (!language || !(language instanceof Language)) {
      return res.status(400).json({ message: "Invalid language object" });
    }
    if (!category || !(category instanceof Category)) {
      return res.status(400).json({ message: "Invalid category object" });
    }

    question.word = word;
    question.meaning = meaning;
    question.example1 = example1;
    question.example2 = example2;
    question.example3 = example3;
    question.example4 = example4;
    question.exampleMeaning1 = exampleMeaning1;
    question.exampleMeaning2 = exampleMeaning2;
    question.exampleMeaning3 = exampleMeaning3;
    question.exampleMeaning4 = exampleMeaning4;
    question.language = language;
    question.category = category;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
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

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ message: "No question found to delete" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
