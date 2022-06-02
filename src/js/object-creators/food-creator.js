export const genereraMat = (c, svårighetsgrad) => {
  const foodlist = [];
  for (let i = 0; i < 50 / svårighetsgrad; i++) {
    const diameter = Math.random() * (5 - 2) + 2;
    const x = Math.random() * (window.innerWidth - 10 - diameter) + diameter;
    const y = Math.random() * (window.innerHeight - 10 - diameter) + diameter;
    foodlist.push({ x, y, diameter });
  }
  console.log(foodlist);
  return foodlist;
};
