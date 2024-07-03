import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "役割名を入力してください"),
  description: z.string().min(1, "説明を入力してください"),
});
