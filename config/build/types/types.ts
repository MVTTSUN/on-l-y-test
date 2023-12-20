type BuildPaths = {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
};

type BuildOptions = {
  mode: "development" | "production";
  port: number;
  paths: BuildPaths;
};

export type { BuildOptions, BuildPaths };
