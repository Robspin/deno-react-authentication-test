import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import staticFileMiddleware from './middleware/staticFileMiddleware.ts';

import apiRoutes from './routes/api.ts';
import userRoutes from './routes/users.ts';

const env = Deno.env.toObject();
const PORT = env.PORT || 5000;
const HOST = env.HOST || 'localhost';
const app = new Application();

// Setting up Oak logger and timer
app.use(async (ctx, next) => {
   await next();
   const rt = ctx.response.headers.get('X-Response-Time');
   console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
   const start = Date.now();
   await next();
   const ms = Date.now();
   ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

// Change in Production
app.use(
   oakCors({
      origin: 'http://localhost:3000'
   })
);

app.use(apiRoutes.routes());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

// Serving static files
app.use(staticFileMiddleware);

console.log(
   `Application is listening on port: ${PORT} or open ${HOST}:${PORT}`
);

await app.listen(`${HOST}:${PORT}`);
