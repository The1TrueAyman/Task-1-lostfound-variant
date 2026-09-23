import { Item } from '../models/Item.js';
import Joi from 'joi';

// TODO: write a validation schema for create/update per README.md section 2.
const createSchema = Joi.object({
  title: Joi.string().min(2).max(60).required(),
  description: Joi.string().min(10),
  category: Joi.string(),
  status: Joi.string(),
  location: Joi.string(),
  reportedBy: Joi.string().hex().length(24)
});

const updateSchema = Joi.object({
  title: Joi.string().min(2).max(60),
  description: Joi.string(),
  status: Joi.string()
});

// GET /api/items
function publicItem(u) {
  return { id: u._id.toString(), title: u.title, description: u.description, category: u.category, status: u.status, location: u.location, reportedBy: u.reportedBy };
}
// TODO: implement per README.md section 3.
export async function getAllItems(req, res, next) {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map(publicItem) });
  } catch (err) { next(err); }
}

// GET /api/items/:id
// TODO: implement per README.md section 3.
export async function getItem(req, res, next) {
  try {
    // TODO
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ item: publicItem(item) });
  } catch (err) { next(err); }
}

// POST /api/items
// TODO: implement per README.md section 3.
export async function createItem(req, res, next) {
  try {
    // TODO
    const { value, error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const existing = await Item.findOne({ title: value.title });
    if (existing) return res.status(409).json({ message: 'Title already used' });

    const item = await Item.create({ title: req.body.title, description: req.body.description, category: req.body.category, status: req.body.status, location: req.body.location, reportedBy: req.body.reportedBy});
    res.status(201).json({ item: publicItem(item) });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/items/:id
// TODO: implement per README.md section 3.
export async function updateItem(req, res, next) {
  try {
    // TODO
    const { value, error } = updateSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ message: error.message });

    const doc = await Item.findByIdAndUpdate(req.params.id, { $set: value }, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'User not found' });
    res.json({ user: publicItem(doc) });
  } catch (err) { next(err); }
}

// DELETE /api/items/:id
// TODO: implement per README.md section 3.
export async function deleteItem(req, res, next) {
  try {
    // TODO
    const doc = await Item.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Item not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
}
