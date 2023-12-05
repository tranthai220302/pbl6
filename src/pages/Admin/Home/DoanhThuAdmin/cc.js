// Trong một file, chẳng hạn seriesData.js
const generateRandomData = (length) => {
    const startDate = new Date('2023-01-01');
    const data = [];
  
    for (let i = 0; i < length; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
  
      data.push({
        x: currentDate.getTime(),
        y: Math.floor(Math.random() * 1000), // Giả sử doanh thu là một số ngẫu nhiên
      });
    }
  
    return data;
  };
  
  const seriesData = {
    monthDataSeries1: {
      prices: generateRandomData(30), // 30 ngày
      dates: generateRandomData(30).map((data) => new Date(data.x).toLocaleDateString('en-US')),
    },
  };
  
  export default seriesData;
  