import { TRPCError } from "@trpc/server";
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
		.mutation(async req => {
			console.log("checking a submission");
			const question = await globals.prisma.question.findUnique({
				where: { id: req.input.questionId },
			});

			if (!question) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "A question with that ID doesn't exist.",
				});
			}

			const student = await globals.prisma.student.upsert({
				where: { sub: req.ctx.user },
				update: {},
				create: { name: "Unnamed", sub: req.ctx.user },
			});

			const score = await globals.prisma.score.upsert({
				where: {
					studentId_courseId: {
						studentId: student.id,
						courseId: question.courseId,
					},
				},
				update: {},
				create: {
					studentId: student.id,
					courseId: question.courseId,
				},
			});

			const correct = question.answer === req.input.answer;

			await globals.prisma.result.upsert({
				where: {
					questionId_scoreId: {
						questionId: question.id,
						scoreId: score.id,
					},
				},
				update: { correct },
				create: { correct, questionId: question.id, scoreId: score.id },
			});

			console.log(`Answer was ${correct ? "correct" : "incorrect"}`);
			return { correct };
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
			}),
		)
		.query(({ input: { questions, videos } }) =>
			globals.prisma.course.findMany({
				include: { questions, videos },
			}),
		),
	get: secure.input(z.string()).query(({ input }) =>
		globals.prisma.course.findUnique({
			where: { id: input },
			include: { videos: true, questions: true },
		}),
	),
});

export const appRouter = t.router({
	course: courseRouter,
	question: questionRouter,
});
