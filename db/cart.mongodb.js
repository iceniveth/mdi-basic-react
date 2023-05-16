use('mdi-db')
db.cart.insertMany([
  { _id: 2, title: 'Potato', quantity: 2 },
  { title: 'Dog', quantity: 1 }
])

use('mdi-db')
db.cart.insertOne(
  { title: 'Fish', quantity: 2 }
)


use('mdi-db')
db.cart.findOne()


use('mdi-db')
db.cart.find()


use('mdi-db')
db.cart.findOne({ _id: 1 })


use('mdi-db')
db.cart.findOne({ _id: ObjectId("64631c6dc3ddad08231ee84e") })






// Update
use('mdi-db')
db.cart.updateOne({ _id: ObjectId("6463353aa4b70924eb43ce31") }, { $set: { quantity: 10 } })

use('mdi-db')
db.cart.updateOne({ _id: ObjectId("6463353aa4b70924eb43ce31") }, { $inc: { quantity: 5 } })

use('mdi-db')
db.cart.updateOne({ _id: ObjectId("6463353aa4b70924eb43ce31") }, { $inc: { quantity: -1 } })

use('mdi-db')
db.cart.updateMany({}, { $set: { quantity: 1 } })




// Upsert (udpate if found, but insert if not)
use('mdi-db')
db.cart.updateOne({ title: 'Apple' }, { $set: { title: 'Apple', quantity: 0 } }, { upsert: true })





// Delete
use('mdi-db')
db.cart.deleteOne({ title: 'Cat' })

use('mdi-db')
db.cart.deleteMany({ quantity: 0 })


