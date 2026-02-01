const express = require("express");
const { Item, isValidId } = require("../models/Item");

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

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

itemsRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { name, description } = req.body || {};
    
    // PUT requires all fields for full update
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "name is required and must be a non-empty string" });
    }

    if (description === undefined || typeof description !== "string") {
      return res.status(400).json({ error: "description is required and must be a string" });
    }

    const update = {
      name: name.trim(),
      description: description.trim(),
    };

    const updated = await Item.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

itemsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { name, description } = req.body || {};
    const update = {};

    // PATCH allows partial updates - only update provided fields
    if (name !== undefined) {
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "name must be a non-empty string" });
      }
      update.name = name.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ error: "description must be a string" });
      }
      update.description = description.trim();
    }

    // At least one field must be provided for PATCH
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "At least one field (name or description) must be provided for update" });
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

    // DELETE should return 204 No Content
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
});

module.exports = { itemsRouter };
