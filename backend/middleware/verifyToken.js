import jwt from "jsonwebtoken"


export const verifyToken = (req, res ,next) =>{

    const token = req.cookies.token
        if(!token) return res.status(401).json({message:"Unauthorized- no token provided"})
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

 if(!decoded) return res.status(401).json({message:"Invalid token"})

        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({message:error.message})
        
    }
}