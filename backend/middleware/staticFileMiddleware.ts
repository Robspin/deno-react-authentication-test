import { Context, send, isHttpError } from 'https://deno.land/x/oak/mod.ts';

const staticFileMiddleware = async (ctx: Context, next: Function) => {
   try {
      await send(ctx, ctx.request.url.pathname, {
         root: `${Deno.cwd()}/frontend/build`,
         index: 'index.html'
      });
   } catch (err) {
      if (isHttpError(err)) {
         ctx.request.url.pathname = '/';
         await send(ctx, ctx.request.url.pathname, {
            root: `${Deno.cwd()}/frontend/build`,
            index: 'index.html'
         });
      } else {
         throw err;
      }
   }
};

export default staticFileMiddleware;
