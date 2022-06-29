export const genereraMat = (c) => {
  const foodlist = [];
  for (let i = 0; i < 900; i++) {
    const radius = Math.random() * (2 - 0) + 0;
    const x = Math.random() * (702 - radius) + radius;
    const y = Math.random() * (580 - radius) + radius;
    foodlist.push({ x, y, radius });
  }
  return foodlist;
};
