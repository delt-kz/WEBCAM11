const express = require("express");
const { Item, isValidId } = require("../models/Item");

const itemsRouter = express.Router();

// GET /api/items
itemsRouter.get("/", async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

// GET /api/items/:id
itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(item);
  } catch (err) {
    return next(err);
  }
});

// POST /api/items
itemsRouter.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body || {};
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "name is required" });
    }

    const created = await Item.create({
      name,
      description: typeof description === "string" ? description : "",
    });

    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
});

// PUT /api/items/:id
itemsRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { name, description } = req.body || {};
    const update = {};

    if (name !== undefined) {
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "name must be a non-empty string" });
      }
      update.name = name;
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ error: "description must be a string" });
      }
      update.description = description;
    }

    const updated = await Item.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

// DELETE /api/items/:id
itemsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json({ message: "Deleted", id: deleted._id });
  } catch (err) {
    return next(err);
  }
});

module.exports = { itemsRouter };
