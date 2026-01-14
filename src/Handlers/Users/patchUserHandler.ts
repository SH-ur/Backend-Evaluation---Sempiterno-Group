import { Request, Response } from 'express'
import updUser from '../../Controllers/Users/updUser';

const patchUserHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updateData = req.body
        
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required in URL parameters'
            })
        }
        
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'User information is required to update'
            })
        }
        
        const userData = {
            id,
            ...updateData
        }
        
        const result = await updUser(userData)
        
        res.status(200).json({
            status: 'success',
            message: result.message,
            data: result.data
        })
        
    } catch (error) {
        console.error('Error in patchUser:', error)
        
        if (error instanceof Error) {
            if (error.message.includes('User not found')) {
                return res.status(404).json({
                    status: 'error',
                    message: error.message
                })
            }
            
            if (error.message.includes('Email is already in use')) {
                return res.status(409).json({
                    status: 'error',
                    message: error.message
                })
            }
            
            if (error.message.includes('User ID is required')) {
                return res.status(400).json({
                    status: 'error',
                    message: error.message
                })
            }
        }
        
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

export default patchUserHandler;