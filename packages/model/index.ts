import { z } from "zod";

export type Question = z.TypeOf<typeof Question>;
export const Question = z.object({
  id: z.string().optional(),
  choices: z.array(z.string()),
  prompt: z.string(),
  courseId: z.string(),
});

export type Video = z.TypeOf<typeof Video>;
export const Video = z.object({
  id: z.string().optional(),
  courseId: z.string(),
  name: z.string(),
  playbackId: z.string(),
});

export type Course = z.TypeOf<typeof Course>;
export const Course = z.object({
  id: z.string().optional(),
  name: z.string(),
  teacherId: z.string(),
  questions: z.array(Question).optional(),
  videos: z.array(Video).optional(),
});

export type Teacher = z.TypeOf<typeof Teacher>;
export const Teacher = z.object({
  id: z.string().optional(),
  name: z.string(),
  courses: z.array(Course).optional(),
});

export type Student = z.TypeOf<typeof Student>;
export const Student = z.object({
  name: z.string(),
});
