import { Request, Response } from 'express'
import auth from '../../../Controllers/Users/Auth/auth';

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Validate that email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            })
        }

        const result = await auth({ email, password })

        if (result.status === 'success' && result.data) {
            res.status(200).json({
                status: 'success',
                message: result.message,
                data: result.data
            })
        } else {
            res.status(401).json({
                status: 'error',
                message: result.message
            })
        }

    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error while login'
        })
    }
}

export default login