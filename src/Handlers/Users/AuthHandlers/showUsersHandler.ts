import { Request, Response } from 'express'
import showUsers from '../../../Controllers/Users/showUsers';

const showUsersHandler = async (req: Request, res: Response) => {
    try {
      
        const queryVars = req.body && Object.keys(req.body).length > 0 
            ? req.body 
            : req.query;

        const result = await showUsers(queryVars);
        
        res.status(200).json({
            status: 'Users List Loaded Successfully!',
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Error getting users',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export default showUsersHandler;