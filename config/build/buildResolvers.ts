import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(option: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": option.paths.src,
    },
  };
}
