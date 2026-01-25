// In-memory database (fake database)
// Data is stored in memory and will be lost when server restarts

let items = [];
let nextId = 1;

// Generate a simple ID (similar to MongoDB ObjectId format)
function generateId() {
  return `item_${nextId++}_${Date.now()}`;
}

// Item model with in-memory operations
const Item = {
  // Find all items
  find: function (query = {}) {
    return Promise.resolve([...items].reverse()); // Return newest first
  },

  // Find item by ID
  findById: function (id) {
    const item = items.find((item) => item._id === id);
    return Promise.resolve(item || null);
  },

  // Create new item
  create: function (data) {
    const newItem = {
      _id: generateId(),
      name: data.name.trim(),
      description: (data.description || "").trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newItem);
    return Promise.resolve(newItem);
  },

  // Update item by ID
  findByIdAndUpdate: function (id, update, options = {}) {
    const index = items.findIndex((item) => item._id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    const item = items[index];
    const updatedItem = {
      ...item,
      ...update,
      updatedAt: new Date().toISOString(),
    };
    items[index] = updatedItem;

    return Promise.resolve(updatedItem);
  },

  // Delete item by ID
  findByIdAndDelete: function (id) {
    const index = items.findIndex((item) => item._id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    const deleted = items[index];
    items.splice(index, 1);
    return Promise.resolve(deleted);
  },
};

// Helper function to validate ID format
function isValidId(id) {
  return typeof id === "string" && id.startsWith("item_");
}

module.exports = { Item, isValidId };
