export const genereraMat = (c) => {
  const foodlist = [];
  for (let i = 0; i < 400; i++) {
    const radius = Math.random() * (3 - 2) + 2;
    const x = Math.random() * (window.innerWidth - 10 - radius) + radius;
    const y = Math.random() * (window.innerHeight - 10 - radius) + radius;
    foodlist.push({ x, y, radius });
  }
  console.log(foodlist);
  return foodlist;
};
