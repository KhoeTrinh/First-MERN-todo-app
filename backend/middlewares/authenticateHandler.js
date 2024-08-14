import jwt from 'jsonwebtoken'
import User from '../models/usersModals.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async(req, res,next) => {
    let token 
    token = req.cookies.jwt
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (err) {
            console.error(err)
            res.status(401).json({ message: 'Invalid token' })
        }
    } else {
        console.error(err)
        res.status(401).json({ message: 'No token, authorization denied' })
    }
})

const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({ message: 'You are not an Admin' })
    }
}

export { authenticate, authorizeAdmin }