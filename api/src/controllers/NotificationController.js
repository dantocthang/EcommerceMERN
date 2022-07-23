import Notification from '../models/Notification.js'
import User from '../models/User.js'


class NotificationController {

    // [GET] /notification/:id
    async getNotification(req, res, next) {
        try {
            const user = await User.findById(req.params.id)
            let temp
            if (user.isAdmin) {
                temp = await Notification.find({
                    status: {
                        $elemMatch: { for: 'Admin' }
                    }
                }).sort({ createdAt: 'desc' })
            }
            else {
                temp = await Notification.find({
                    status: {
                        $elemMatch: { for: user._id }
                    }
                }).sort({ createdAt: 'desc' })
            }
            const notifications = temp.map(item => ({
                ...item._doc,
                status: [...item._doc.status].filter(a => a.for === (user.isAdmin ? 'Admin' : user._id))
            }))
            res.json({ success: true, data: notifications })
        } catch (error) {
            next(error)
        }
    }

    // [PATCH] /notification/:id/:notificationId
    async updateStatus(req, res, next) {
        try {
            Notification.updateOne({ 'status._id': req.params.notificationId }, {
                '$set': {
                    'status.$.isRead': true
                }
            }, function (err) { })
            res.json({ success: true, message: 'Read' })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /notification/:id
    async readAll(req, res, next) {
        try {
            const user = await User.findById(req.params.id)
            let notifications
            if (user.isAdmin) {
                notifications = await Notification.find({ for: 'Admin' })
            }


        } catch (error) {
            next(error)
        }
    }
}

export default new NotificationController()
