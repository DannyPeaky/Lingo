const generateEmptySet = () => {
  const obj: Record<number, Record<number | string, number>> = {};
  for (let i = 4; i <= 6; i++) obj[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, wrong: 0 };
  return obj;
};

export default generateEmptySet;
