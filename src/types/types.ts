type DataTheme = {
  id: string;
  name: string;
  endYear: number;
  startYear: number;
  years: YearSlice[];
};

type YearSlice = {
  id: string;
  year: number;
  text: string;
};

export type { DataTheme, YearSlice };
