// author: Preetha Kachhadiya

const { AdminApproval } = require('../model/AdminApproval.model')
const { AdminQuery } = require('../model/AdminQuery.model')
// const { Event } = require('../model/Event.model')
const mongoose = require('mongoose')
const sendMail = require("../utils/sendEmail");

// const createWishlist = async data => {
//   return Wishlist.create(data)
// }

const getPendingApprovalRequests = async payload => {
  // const { userId = '', eventId = '' } = payload
  // try {
    // Retrieve all documents with approval_status as "pending"

    try {
      const pendingApprovals = await AdminApproval.find({ approval_status: 'pending' })
  
      return pendingApprovals
    }
    catch (error) {
      throw new Error('Error getting queries.')
    }

    // AdminApproval.find({ approval_status: 'pending' }, (err, pendingApprovals) => {
    //   if (err) {
    //     console.error('Error fetching pending approvals:', err);
    //     return;
    //   }
    //   console.log('Pending approvals:', pendingApprovals);
    //   return pendingApprovals
    // });


  // }
  // catch (error) {
  //   throw new Error('Error getting approval list.')
  // }
}

const updateApprovalStatus = async payload => {
  const { approval_status = '', request_id = ''} = payload

  try {
    const updatedApproval = await AdminApproval.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(request_id) },
      { $set: { approval_status: approval_status } },
      { new: true })
    console.log('updated approval status:', updatedApproval);
    const subject = "Approval request " + approval_status
    const html = "Your approval status for posting events has been " + approval_status
    await sendMail(updatedApproval.user_email, subject, html);
    return updatedApproval
  }
  catch (error) {
    throw new Error('Error updating approval.')
  }

  // Find and update the document by its ObjectId
  // AdminApproval.findOneAndUpdate(
  //   { _id: mongoose.Types.ObjectId(request_id) },
  //   { $set: { approval_status: approval_status } },
  //   { new: true }, // Return the updated document
  //   (err, updatedApproval) => {
  //     if (err) {
  //       console.error('Error updating approval status:', err);
  //       return;
  //     }

  //     if (!updatedApproval) {
  //       console.log('Document not found.');
  //       return;
  //     }

  //     console.log('Updated approval:', updatedApproval);
  //     const subject = "Approval request " + approval_status
  //     const html = "Your approval status for posting events has been " + approval_status
  //     sendMail(email, subject, html);
  //     // send_email(updatedApproval)
  //   }
  // );
}

const getAllOpenAdminQueries = async payload => {
  // Retrieve all records with status as 'pending'

  try {
    const pendingQueries = await AdminQuery.find({ status: 'open' })

    return pendingQueries
  }
  catch (error) {
    throw new Error('Error getting queries.')
  }
}

const updateAdminQuery = async payload => {
  const { response = '', query_id = ''} = payload

  try {
    const updatedQuery = await AdminQuery.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(query_id) },
      { $set: { response: response, status: 'closed' } },
      { new: true })

    return updatedQuery
  }
  catch (error) {
    throw new Error('Error updating query.')
  }

  // // Find and update the document by its userId
  // AdminQuery.findOneAndUpdate(
  //   { _id: mongoose.Types.ObjectId(query_id) },
  //   { $set: { response: response, status: 'closed' } },
  //   { new: true }, // Return the updated document
  //   (err, updatedQuery) => {
  //     if (err) {
  //       console.error('Error updating query:', err);
  //       return;
  //     }

  //     if (!updatedQuery) {
  //       console.log('Document not found.');
  //       return;
  //     }

  //     console.log('Updated query:', updatedQuery);
  //   }
  // );
}


// const getAllEventsFromWishlist = async queryParams => {
//   const { sortBy = '', filterBy = '', userId = '' } = queryParams

//   // if (sortBy)
//   //   //   const cursor = await Event.find({}).skip(skip).limit(limit)
//   //   return {
//   //     count: await Event.countDocuments(),
//   //     events: cursor
//   //   }

//   try {
//     let query = { userId: mongoose.Types.ObjectId(userId) }

//     // Apply filtering based on filterBy option
//     if (filterBy === 'thisWeek') {
//       const today = new Date()
//       const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
//       query['dateAndTime'] = { $gte: oneWeekAgo, $lte: today }
//     } else if (filterBy === 'thisMonth') {
//       const today = new Date()
//       const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
//       query['dateAndTime'] = { $gte: firstDayOfMonth, $lte: today }
//     } else if (filterBy === 'withinSixMonths') {
//       const today = new Date()
//       const sixMonthsAgo = new Date() // 6 months ago
//       sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() + 6)
//       query['dateAndTime'] = { $lte: sixMonthsAgo, $gte: today }
//     }

//     // Apply sorting based on sortBy option
//     const sortOptions = {}
//     if (sortBy === 'date') {
//       sortOptions['dateAndTime'] = 1 // 1 for ascending, -1 for descending
//     } else if (sortBy === 'nameAscending') {
//       sortOptions['name'] = 1
//     } else if (sortBy === 'nameDescending') {
//       sortOptions['name'] = -1
//     }

//     console.log(query, sortOptions)

//     const wishlistItems = await Wishlist.find(query).populate({
//       path: 'events',
//       match: query, // Applying the same filter on events as well
//       options: { sort: sortOptions } // Applying the sorting options on events
//     })

//     return wishlistItems[0]
//   } catch (error) {
//     throw new Error('Error while fetching wishlist items.' + error.message)
//   }
// }

module.exports = {
  // createWishlist,
  getAllOpenAdminQueries,
  getPendingApprovalRequests,
  updateApprovalStatus,
  updateAdminQuery
}
