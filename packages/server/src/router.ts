import { TRPCError } from "@trpc/server";
import { Video } from "model";
import { z } from "zod";
import { globals, t } from "./globals";
import { isSignedIn } from "./middleware";

const secure = t.procedure.use(isSignedIn);

const Answer = z.object({
  questionId: z.string(),
  answer: z.string(),
});

const Response = z.object({
  correct: z.boolean(),
});

export const questionRouter = t.router({
  submit: secure
    .input(Answer)
    .output(Response)
    .mutation(async ({ input }) => {
      const question = await globals.prisma.question.findUnique({
        where: { id: input.questionId },
      });

      if (!question) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A question with that ID doesn't exist.",
        });
      }

      return { correct: question.answer === input.answer };
    }),
});

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
  get: secure.input(z.string()).query(({ input }) =>
    globals.prisma.course.findUnique({
      where: { id: input },
      include: { videos: true, questions: true },
    })
  ),
});

export const appRouter = t.router({
  course: courseRouter,
});
