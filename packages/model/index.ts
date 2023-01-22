import { z } from "zod";

export type Video = z.TypeOf<typeof Video>;
export const Video = z.object({
  name: z.string(),
  playbackId: z.string(),
  courseId: z.string(),
});
