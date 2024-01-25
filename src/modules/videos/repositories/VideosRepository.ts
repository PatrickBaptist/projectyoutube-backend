import { pool } from '../../../mysql'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'

class VideosRepository {
    
    create(request: Request, response: Response) {
        const {tittle, description, users_user_id} = request.body

        pool.getConnection((err: any, connection: any) => {

        connection.query(
            'INSERT INTO videos (video_id, users_user_id, tittle, description) VALUES (?,?,?,?)',
            [uuidv4(), users_user_id, tittle, description],
            (error: any, result: any, fileds: any) => {
            connection.release()
                if (error) {
                    return response.status(400).json(error)
                }
                response.status(200).json({message: 'Vídeo criado com sucesso'})
            }
        )
            }
        )
    }
    getVideos (request: Request, response: Response) {
        
        const {users_user_id} = request.query
        
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE users_user_id = ?',
                [users_user_id],
                (error: any, results: any, fileds: any) => {
                    connection.release()
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar os vídeos"})
                    }
                    return response.status(200).json({message: "Vídeos retornados com sucesso", videos: results})
                }
            )
        })
    }

    searchVideos (request: Request, response: Response) {
        
        const {search} = request.query
        
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE tittle LIKE ?',
                [`%${search}%`],
                (error: any, results: any, fileds: any) => {
                    connection.release()
                    if (error) {
                        return response.status(400).json({error: "Erro ao buscar os vídeos"})
                    }
                    return response.status(200).json({message: "Vídeos retornados com sucesso", videos: results})
                }
            )
        })
    }
}

export { VideosRepository }