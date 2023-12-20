import { faker } from "@faker-js/faker/locale/ru";

const generateFakeData = () => {
  const themes = [
    "Политика",
    "История",
    "Литература",
    "Музыка",
    "Кино",
    "Наука",
  ];

  const nowYear = new Date().getFullYear();
  let calculatedYear = nowYear;

  return themes
    .map((theme) => {
      const endYear = calculatedYear - 1;
      calculatedYear -= faker.number.int({ min: 6, max: 12 });
      const startYear = calculatedYear;
      const countYears = endYear - startYear + 1;

      return {
        id: faker.string.uuid(),
        name: theme,
        endYear,
        startYear,
        years: new Array(countYears).fill(null).map((_, index) => ({
          id: faker.string.uuid(),
          year: startYear + index,
          text: faker.lorem.sentence({ min: 5, max: 10 }).replace(/\.$/, ""),
        })),
      };
    })
    .reverse();
};

const calculateCoordinateInCircle = (count: number, r: number) => {
  const cx = r;
  const cy = r;
  let startAngle = -60;

  return new Array(count).fill(null).map(() => {
    const angle = 360 / count;
    const rad = Math.PI / 180;
    const x = cx + r * Math.cos(startAngle * rad);
    const y = cy + r * Math.sin(startAngle * rad);
    startAngle += angle;

    return { x, y };
  });
};

export { generateFakeData, calculateCoordinateInCircle };
