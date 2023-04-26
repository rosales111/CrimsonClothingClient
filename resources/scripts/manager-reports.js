fetch('/api/sales')
  .then(response => response.json())
  .then(data => {
    const chartData = processData(data);
    renderChart(chartData);
  })
  .catch(error => console.error(error));

function processData(data) {
  const chartData = {
    labels: [],
    datasets: [{
      label: 'Sales by Category',
      data: [],
      backgroundColor: [],
    }]
  };

  const salesByCategory = {};
  data.forEach(sale => {
    if (!salesByCategory[sale.category]) {
      salesByCategory[sale.category] = 0;
    }
    salesByCategory[sale.category] += sale.amount;
  });

  for (const category in salesByCategory) {
    chartData.labels.push(category);
    chartData.datasets[0].data.push(salesByCategory[category]);
    chartData.datasets[0].backgroundColor.push(getRandomColor());
  }

  return chartData;
}

function renderChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
