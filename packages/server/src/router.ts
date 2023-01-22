import { Video } from "model";
import { z } from "zod";
import { globals, t } from "./globals";
import { isSignedIn } from "./middleware";

const secure = t.procedure.use(isSignedIn);

export const videoRouter = t.router({
  list: secure.query(() => globals.prisma.video.findMany()),
});

export const courseRouter = t.router({
  list: secure
    .input(
      z.object({
        questions: z.boolean().optional(),
        videos: z.boolean().optional(),
      })
    )
    .query(({ input: { questions, videos } }) =>
      globals.prisma.course.findMany({
        include: { questions, videos },
      })
    ),
});

export const appRouter = t.router({
  course: courseRouter,
});
