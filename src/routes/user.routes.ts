import { Router } from 'express'
import { UserRepository } from '../modules/user/repository/UserRepository'
import { login } from '../middleware/login'


const userRoutes = Router()
const usersRepository = new UserRepository()

userRoutes.post('/sign-up', (request, response) => {
    usersRepository.create(request, response)
})

userRoutes.post('/sign-in', (request, response) => {
    usersRepository.login(request, response)
})

userRoutes.get('/get-user', login, (request, response) => {
    usersRepository.getUser(request, response)//puxa as informações
})


export {userRoutes} 