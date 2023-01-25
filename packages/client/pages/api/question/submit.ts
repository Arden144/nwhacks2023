import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]";

type Request = z.TypeOf<typeof Request>;
const Request = z.object({
	questionId: z.string(),
	answer: z.string(),
});

type Response = Success | Error;

interface Success {
	success: true;
	correct: boolean;
}

interface Error {
	success: false;
	error: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session?.user) {
		res
			.status(401)
			.json({ success: false, error: "You must be logged in to perform this action." });
		return;
	}

	const result = Request.safeParse(req.body);
	if (!result.success) {
		res
			.status(400)
			.json({ success: false, error: `Request body was not valid: ${result.error.message}` });
		return;
	}

	const { questionId, answer } = result.data;

	console.log("checking a submission");
	const question = await prisma.question.findUnique({
		where: { id: questionId },
	});

	if (!question) {
		res.status(400).json({ success: false, error: "A question with that ID doesn't exist." });
		return;
	}

	const student = await prisma.student.upsert({
		where: { sub: session.user.id },
		update: {},
		create: { name: "Unnamed", sub: session.user.id },
	});

	const score = await prisma.score.upsert({
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

	const correct = question.answer === answer;

	await prisma.result.upsert({
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

	res.status(200).json({ success: true, correct });
}
