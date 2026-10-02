import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { recommendServices } from "./service-advisor.server";

export const getServiceRecommendation = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ description: z.string().trim().min(20).max(2000) }).parse(data))
  .handler(async ({ data }) => recommendServices(data.description));