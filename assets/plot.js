var ctx = document.getElementById('myChart').getContext('2d');
var m = moment().utcOffset(0);
m.set({hour:0,minute:0,second:0,millisecond:0})
m.toISOString()

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: Array.from(new Array(24), (x, i) => {
            var m = moment().utcOffset(0);
            m.set({hour: i,minute:0,second:0,millisecond:0})
            return m;//.toISOString()
            // return new Date();
        }),
        datasets: [{
            fill: false,
            label: 'My First dataset',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgb(255, 255, 255 )',
            data: Array.from(new Array(24), (x, i) => {
                var m = moment().utcOffset(0);
                // m.set({hour: i,minute:0,second:0,millisecond:0})
                if(i <= m.hour())
                    return 20 * Math.random();
                return undefined;
            }),
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            display: false
        },  
        scales: {
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    borderDash: [3, 3],
                    color: 'rgba(255, 255, 255, 0.2)',
                    // color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
                },
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 20,
                    fontColor: 'rgba(255, 255, 255, 0.6)',
                }
            }],
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'hour',
                },
                gridLines: {
                    drawBorder: false,
                    borderDash: [3, 3],
                    color: 'rgba(255, 255, 255, 0.2)',
                    // color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
                },
                ticks: {
                    fontColor: 'rgba(255, 255, 255, 0.6)',
                    
                }
            }]
        },
        
    }
});
