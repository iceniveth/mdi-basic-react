import express from 'express';
import { z } from 'zod';

const router = express.Router();

const CartSchema = z.object({
  id: z.number(),
  title: z.string(),
  quantity: z.number(),
})

let cart = [
  { id: 1, title: 'Jacket', quantity: 1 }
];
// get
// add to Cart
// increment/decrement items sa cart
// remove an item cart
// remove all cart items.

router.get('/', (req, res) => {
  res.status(200).send(cart);
})

router.post('/', (req, res) => {
  const newCartItem = { ...req.body, id: new Date().getTime() }

  const parsedResult = CartSchema.safeParse(newCartItem)

  if (!parsedResult.success) {
    return res.status(400).send(parsedResult.error)
  }

  cart = [...cart, parsedResult.data]
  res.status(201).send(parsedResult.data)
})

// /api/cart/2
router.patch('/:id', (req, res) => {
  const cartId = req.params.id;

  const foundIndex = cart.findIndex(ci => ci.id === Number(cartId))

  if (foundIndex === -1) {
    res.status(404).send('Not Found')
  } else {
    cart[foundIndex].quantity = req.body.quantity
    res.status(200).send(cart[foundIndex])
  }

})

router.delete('/', (req, res) => {
  cart = [];
  res.status(204).send()
})

export default router;
