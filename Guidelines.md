Frontend init : https://tailwindcss.com/docs/installation/framework-guides/nextjs

npx create-next-app@latest frontend --typescript --eslint --app

on 1:25 - find the template in internet -> Vercel login

https://github.com/vercel/nextjs-postgres-auth-starter/blob/main/app/page.tsx

on 1:34 - use the hashlib to hash the password

then modify it into the LoginPage.tsx

on 1:43 - focus on the backend, create health router, auth router, booking router

on 1:45 - create the model.py to store schema of request and model.

To do list - authentication the X-Token in every requests.

Switched from HTTPBearer to OAuth2PasswordBearer. The differences:

HTTPBearer (old)	OAuth2PasswordBearer (current)
Swagger UI	No "Authorize" button	"Authorize" button works with token
Header format	Same Bearer <token>	Same Bearer <token>
FastAPI docs	Legacy how-to page	Official recommended approach
Token extraction	credentials.credentials	Gives you the token string directly
The tokenUrl="/login" tells Swagger where to authenticate, so you can test everything directly from /docs.