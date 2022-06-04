import Router from '@koa/router';
import KoaRouter from '@koa/router' // Lida com os urls/paths/rotas
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const router = new Router();
const prisma = new PrismaClient()

  
router.get('/tweets', async ctx => {
    const tweets = await prisma.tweet.findMany()

    const [, token] = ctx.request.headers?.authorization?.split(' ') || []

    if(!token){
        ctx.status = 401
        return
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch(error){
        ctx.status = 401
        return
    }

 
    ctx.body =  tweets
})


router.post('/tweets', async ctx => {
    const [, token] = ctx.request.headers?.authorization?.split(' ') || []
    
    if(!token){
        ctx.status = 401
        return
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)  // Verifica se o tolkin é valido pelo nosso próprio back 

        const tweet = await prisma.tweet.create({
            data: {
                userId: payload.sub,
                text: ctx.request.body.text
            }
        })

        ctx.body = tweet
 
    } catch(error){
            ctx.status = 401
            return
    }

    const tweet = await prisma.tweet.create({
        data: {
            userId:'cl3wap5gy00569otku5nuhm9c',
            text: ctx.request.body.text
        }
   })

   ctx.body = tweet
})


//Rota de cadastro
router.post('/signup', async ctx => {
    const saltRounds = 10
    const password = bcrypt.hashSync(ctx.request.body.password, saltRounds);

    try { 
        const user = await prisma.user.create({
            data: {
                name: ctx.request.body.name,
                username: ctx.request.body.username,
                email: ctx.request.body.email,
                password,
            }
        })

        ctx.body = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        }
    } catch (error) {
        if(error.meta && !error.meta.target) {
            ctx.status = 422
            ctx.body = "Email ou nome de usuário já existe."
            return
        }

        ctx.status = 500
        ctx.body = "Internal error"
    }
})
 



router.get('/login', async ctx => {
    const [, token] = ctx.request.headers.authorization.split(' ')
    const [email, plainTextPassword] = Buffer.from( token, 'base64').toString().split(':') // Decodificando a senha
  
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
  
    if (!user) {
      ctx.status = 404
      return
    }
  
    const passwordMatch = bcrypt.compareSync(plainTextPassword, user.password)
  
    if (passwordMatch) {
      const accessToken = jwt.sign(
        {
          sub: user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )
  
      delete user.password
      ctx.body = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        accessToken
      }
      return
    }
  
    ctx.status = 404
  })



   