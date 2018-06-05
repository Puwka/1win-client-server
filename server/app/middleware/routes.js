import Router from 'koa-router';
import controllers from '../controllers/controllers'
import convert from 'koa-convert';
import KoaBody from 'koa-body';


const router = new Router(),
    koaBody = convert(KoaBody());

    router
        .get('/books', async (ctx, next) => {
            ctx.body = await controllers.getLength()
        })
        .post('/books/get/:id', koaBody, async (ctx, next) => {
            let result = await controllers.get(ctx.params.id, Number(ctx.request.body.size));
            if (result) {
                ctx.body = result
            } else {
                ctx.status = 204
            }
        })
        .post('/books', koaBody, async (ctx, next) => {
            ctx.status = 201;
            ctx.body = await controllers.create(ctx.request.body)
        })
        .put('/books/:id', koaBody, async (ctx, next) => {
            ctx.status = 204;
            await controllers.update(ctx.params.id, ctx.request.body);
        })
        .delete('/books/:id', async (ctx, next) => {
            ctx.status = 204;
            await controllers.delete(ctx.params.id);
        });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }

