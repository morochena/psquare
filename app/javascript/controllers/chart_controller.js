import { Controller } from "@hotwired/stimulus"
import { Chart } from 'chart.js'

export default class extends Controller {
  static targets = ["projects"]
  chart = null

  generateData() {
    return this.projectsTargets.map(project => {
      return {
        label: project.dataset.projectNameParam,
        x: project.dataset.projectAvgEffortScoreParam,
        y: project.dataset.projectAvgImpactScoreParam,
      }
    })
  }

  projectsTargetConnected(target) {
    this.updateData();
  }

  projectsTargetDisconnected(target) {
    this.updateData();
  }

  render() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const dataSet = this.generateData();

    const data = {
      datasets: [{
        label: 'Average Score',
        data: dataSet,
        backgroundColor: 'rgb(71,85,105)',
      }],
    };

    const quadrants = {
      id: 'quadrants',
      beforeDraw(chart, args, options) {
        const { ctx, chartArea: { left, top, right, bottom }, scales: { x, y } } = chart;
        const midX = x.getPixelForValue(2.5);
        const midY = y.getPixelForValue(2.5);
        ctx.save();
        ctx.fillStyle = options.topLeft;

        ctx.fillRect(left, top, midX - left, midY - top);
        ctx.fillStyle = options.topRight;
        ctx.fillRect(midX, top, right - midX, midY - top);
        ctx.fillStyle = options.bottomRight;
        ctx.fillRect(midX, midY, right - midX, bottom - midY);
        ctx.fillStyle = options.bottomLeft;
        ctx.fillRect(left, midY, midX - left, bottom - midY);
        ctx.restore();
      }
    };

    const truncate = (value) => {
      if (value.length > 45) {
        return value.substring(0, 45) + '...';
      }
      return value;
    };

    const toFixedIfNecessary = (value, dp) => {
      return +parseFloat(value).toFixed(dp);
    }

    const config = {
      type: 'scatter',
      data: data,
      options: {
        responsive: false,
        elements: {
          point: {
            radius: 5
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Impact'
            },
            min: -0.25,
            max: 5.25,
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          },
          x: {
            title: {
              display: true,
              text: 'Effort'
            },
            min: -0.25,
            max: 5.25,
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          },
        },
        plugins: {
          quadrants: {
            topLeft: 'rgba(20, 184, 166, 0.5)',
            topRight: 'rgba(253, 224, 71, 0.5)',
            bottomRight: 'rgba(248, 113, 113, 0.5) ',
            bottomLeft: 'rgba(253, 224, 71, 0.5)',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${truncate(context.raw.label)}: (Effort: ${toFixedIfNecessary(context.parsed.x, 2)}, Impact: ${toFixedIfNecessary(context.parsed.y, 2)})`;
              }
            }
          }
        },
      },
      plugins: [quadrants],
    };


    this.chart = new Chart(ctx, config);
  }

  updateData() {
    try {
      const dataSet = this.generateData();
      this.chart.data.datasets[0].data = dataSet;
      this.chart.update();
    } catch (e) {

    }
  }

  connect() {
    this.render()
  }
}


