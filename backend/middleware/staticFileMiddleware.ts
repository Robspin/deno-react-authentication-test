import { Context, send } from 'https://deno.land/x/oak/mod.ts';

const staticFileMiddleware = async (ctx: Context, next: Function) => {
   await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/frontend/build`,
      index: 'index.html'
   });
};

export default staticFileMiddleware;
