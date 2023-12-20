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

const getPositionThemesInCircle = (circleSize: number) => {
  const radius = circleSize / 2;
  const halfRadius = radius / 2;
  const positionChord =
    radius - Math.ceil(Math.sqrt(radius ** 2 - halfRadius ** 2));

  return [
    [0 + positionChord, radius + halfRadius],
    [radius, circleSize],
    [circleSize - positionChord, radius + halfRadius],
    [circleSize - positionChord, halfRadius],
    [radius, 0],
    [0 + positionChord, halfRadius],
  ];
};

export { generateFakeData, getPositionThemesInCircle };
