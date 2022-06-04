Usamos o express para lidar com o HTTPS, mas nessa aula vamos usar O KOA que eu nunca ovi falar antes

> npm install koa
> npm i @koa/router
> npm install @koa/cors 

> npm install prisma --save-dev 

> npx prisma init
> npm install @prisma/client // Isso serve para usar na produção já que o prisma original é usado em dev
> npx prisma generate // Ele usa o client acima para atualizar alguns dados. Digitar o comando 

> npx prisma studio //visual do banco

Body parser:
Pega o que foi enviado no body, trata e devovle em uma variavel



> npx prisma db push // Isso serve pra fazer uma magration com o prisma, ou seja, toda vez que a gente fizer uma aletrção no banco de dados, ele sobre essa aletração, como se tivesse dando um ctrl S ouuuu digitando o comando no terminal SQL do banco dizendo que algo foi atualziado. Nao pode usar isso sempre pq toda vez que usa ele deleta o que ta salvo no banco, entao so pode usar uma vez, as outras tem qe ser contraladas com migratopn mesmo


Banco de dados na nuvem que foi usado:
https://app.planetscale.com/flalannie/moodatual/settings/beta-features

Status de erro: https://www.httpstatus.com.br/

https://dev.to/brunobertolini/como-realmente-o-cors-funciona-entendendo-de-uma-vez-por-todas-ae0



> npm install bcrypt
usado para criptografar senhas antes de mandar elas pro banco de dados


> npm install jsonwebtoken
para lidar com o9o token por user