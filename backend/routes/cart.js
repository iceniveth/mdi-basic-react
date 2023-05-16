import express from 'express';
import { z } from 'zod';
import { cartCollection } from '../db.js'
import { ObjectId } from 'mongodb';

const router = express.Router();

const CartSchema = z.object({
  title: z.string(),
  quantity: z.number(),
})

router.get('/', async (req, res) => {
  const cart = await cartCollection.find().toArray()
  res.status(200).send(cart);
})

router.post('/', async (req, res) => {
  const newCartItem = req.body
  const parsedResult = CartSchema.safeParse(newCartItem)

  if (!parsedResult.success) return res.status(400).send(parsedResult.error)

  const result = await cartCollection.insertOne(parsedResult.data)
  const { insertedId } = result
  const cartItem = await cartCollection.findOne({ _id: new ObjectId(insertedId) })
  res.status(201).send(cartItem)
})

router.patch('/:id', async (req, res) => {
  const cartId = req.params.id;
  const { quantity } = req.body

  if (!ObjectId.isValid(cartId)) return res.status(400).send('Invalid ID')

  const foundCartItem = await cartCollection.findOne({ _id: new ObjectId(cartId) })
  if (foundCartItem == null) return res.status(404).send('Not Found')

  const parsedResult = CartSchema.safeParse({ ...foundCartItem, quantity })
  if (!parsedResult.success) return res.status(400).send(parsedResult.error)

  await cartCollection.updateOne({ _id: new ObjectId(cartId) }, { $set: { quantity } })
  const cartItem = await cartCollection.findOne({ _id: new ObjectId(cartId) })
  res.status(200).send(cartItem)
})

router.delete('/:id', async (req, res) => {
  const cartId = req.params.id;

  if (!ObjectId.isValid(cartId)) return res.status(400).send('Invalid ID')

  const foundCartItem = await cartCollection.findOne({ _id: new ObjectId(cartId) })
  if (foundCartItem == null) return res.status(404).send('Not Found')

  await cartCollection.deleteOne({ _id: new ObjectId(cartId) })
  res.status(204).send()
})

router.delete('/', async (req, res) => {
  await cartCollection.deleteMany({})
  res.status(204).send()
})

export default router;
