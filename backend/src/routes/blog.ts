import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput } from "@vishaaal05/medium-common";
import { updatePostInput } from "@vishaaal05/medium-common";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();


blogRouter.use("*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            // @ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            });
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message: "Invalid authentication token"
        });
    }
});

blogRouter.post('/', async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const {success} = createPostInput.safeParse(body)

        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({ id: post.id });
    } catch (error) {
        return c.json({ message: 'An error occurred'}, { status: 500 });
    }
});

blogRouter.put('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const {success} = updatePostInput.safeParse(body)

        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.json({ message: 'Post updated', post });
    } catch (error) {
        return c.json({ message: 'An error occurred'}, { status: 500 });
    }
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const posts = await prisma.post.findMany();
        return c.json(posts);
    } catch (error) {
        return c.json({ message: 'An error occurred'}, { status: 500 });
    }
});


blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const post = await prisma.post.findFirst({
            where: { id }
        });
        if (post) {
            return c.json(post);
        } else {
            return c.json({ message: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        return c.json({ message: 'An error occurred'}, { status: 500 });
    }
});




