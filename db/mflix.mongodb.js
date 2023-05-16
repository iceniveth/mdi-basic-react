use('sample_mflix')
db.movies.findOne()


use('sample_mflix')
db.movies.find()


use('sample_mflix')
db.movies.findOne({ _id: ObjectId("573a1390f29313caabcd42e8") })



// Count documents
use('sample_mflix')
db.movies.countDocuments()

use('sample_mflix')
db.movies.countDocuments({ type: 'series' })

// count series that are year >= 2000
use('sample_mflix')
db.movies.countDocuments({ type: 'series', year: { $gte: 2000 } })





// Selecting specific fields
use('sample_mflix')
db.movies.find({}, { genres: 1, cast: 1, title: 1, year: 1, awards: 1 })

// Excluding some fields
use('sample_mflix')
db.movies.find({}, { genres: 0, cast: 0, title: 0, year: 0, awards: 0 })

// We will get an error if we try to specify both 0 and 1 in the same object.
use('sample_mflix')
db.movies.find({}, { genres: 0, cast: 1, title: 1, year: 0, awards: 0 })

// Exception is the _id
use('sample_mflix')
db.movies.find({}, { _id: 0, genres: 1, cast: 1, title: 1, year: 1, awards: 1 })






// Sorting ascending
use('sample_mflix')
db.movies.find({}, { _id: 0, title: 1 }).sort({ title: 1 })

// Sorting descending
use('sample_mflix')
db.movies.find({}, { _id: 0, title: 1 }).sort({ title: -1 })

use('sample_mflix')
db.movies.find({}, { _id: 0, year: 1, title: 1 }).sort({ year: -1, title: 1 })




// Filtering
// year 2000
use('sample_mflix')
db.movies.find({ year: 2000 }, { _id: 0, type: 1, title: 1, year: 1 })

use('sample_mflix')
db.movies.find({ year: "2010è" }, { _id: 0, type: 1, title: 1, year: 1 })

// Nmeric years
use('sample_mflix')
db.movies.find({ year: { $type: 'number' } }, { _id: 0, type: 1, title: 1, year: 1 })

// string years
use('sample_mflix')
db.movies.find({ year: { $type: 'string' } }, { _id: 0, type: 1, title: 1, year: 1 })

// Not type movie
use('sample_mflix')
db.movies.find({ type: { $ne: "movie" } }, { _id: 0, type: 1, title: 1, year: 1 })

// Movies between 2000 - 2010
use('sample_mflix')
db.movies.find({ year: { $gte: 2000, $lt: 2011 } }, { _id: 0, type: 1, title: 1, year: 1 })

use('sample_mflix')
db.movies.find({ year: { $gte: 2000, $lt: 2011 } }, { _id: 0, type: 1, title: 1, year: 1 }).countDocuments()

// Search
use('sample_mflix')
db.movies.find({ title: { $regex: /the/i } }, { _id: 0, title: 1 }).limit(20)



// Aggregate

// Count type of records
use('sample_mflix')
db.movies.aggregate([
  { $group: { _id: '$type', count: { $sum: 1 } } }
])

// grouped by type, year with count (sorted)
use('sample_mflix')
db.movies.aggregate([
  { $group: { _id: { type: '$type', year: '$year' }, count: { $sum: 1 } } },
  { $sort: { "_id.type": 1, "_id.year": 1 } }
])

// grouped by type, year with count (sorted) filtere year 2000 - 2011
use('sample_mflix')
db.movies.aggregate([
  { $match: { year: { $gte: 2000, $lt: 2011 } } },
  { $group: { _id: { type: '$type', year: '$year' }, count: { $sum: 1 } } },
  { $sort: { "_id.type": 1, "_id.year": 1 } }
])













// Demo for DBRef
use('sample_demo')
db.users.insertOne({
  _id: ObjectId("5f87d1ae0a6a66d79045c9ab"),
  name: "John Doe",
  email: "john@example.com"
})

use('sample_demo')
db.orders.insertOne({
  _id: ObjectId("5f87d1ae0a6a66d79045c9ac"),
  orderNumber: "ORD-001",
  user: {
    $ref: "users",
    $id: ObjectId("5f87d1ae0a6a66d79045c9ab")
  }
})

use('sample_demo')
db.orders.find()

use('sample_demo')
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user.$id",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $match: {
      _id: ObjectId("5f87d1ae0a6a66d79045c9ac")
    }
  }
])

use('sample_demo')
db.orders.aggregate([
  {
    $match: {
      _id: ObjectId("5f87d1ae0a6a66d79045c9ac")
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "user.$id",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $addFields: {
      user: { $arrayElemAt: ["$user", 0] }
    }
  }
])