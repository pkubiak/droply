const SEMANTIC_COLORS = {
    '#water-flow': [
        [null, 0.05, 'green'],
        [0.001, 10.0, 'orange'],
        [10.0, null, 'red']
    ],
    '#water-temperature': [
        [null, 10, 'blue'],
        [10, 40, 'yellow'],
        [40, null, 'red']
    ]
}

const INTERVALS = {};

function animateText(id, value, duration) {
    if(id in INTERVALS)
        clearInterval(INTERVALS[id]);

    let i=0, ticks=duration * 40;
    el = document.querySelector(id);
    // console.log(el);
    let valueEl = el.querySelector('[data-value]')
    let timing = (t) => 1-Math.pow(1-t, 3);
    let iconEl = el.querySelector('.card-icon');
    let start = parseFloat(valueEl.innerText) || 0.0;
    
    
    
    let ref = setInterval(function() {
        if(i > ticks) {
            clearInterval(ref);
            delete INTERVALS[id];
        } else {
            let val = start + (value - start) * timing(i / ticks) ;
            let color = 'gray';
            if(id in SEMANTIC_COLORS) {
                for(let item of SEMANTIC_COLORS[id]) {
                    if((item[0] === null || item[0] < val)&&(item[1] === null || item[1] >= val))
                        color = item[2];
                }
            }
            valueEl.innerText = val.toFixed(2);

            iconEl.style.backgroundColor = 'var(--' + color + ')';
            // console.log(el);

            i += 1;
        }
    }, 1000 * duration / ticks);
    INTERVALS[id] = ref;
}

// animateText("#water-flow", 3.1, 2);
// animateText("#water-temperature", 16.0, 2);


// setInterval(function(){
//     animateText("#water-flow", 10*Math.random(), 1);
//     animateText("#water-temperature", 100*  Math.random() - 30  , 2 );
// }, 5000);


function extractFlow(data) {
    data = data.filter(item => item.type=='Count')
    data.sort((a,b) => b.id - a.id);
    let record = data[0];
    let flow = record.value / (record.interval / 1000);
    animateText("#water-flow", 6.1*flow, 2);
}

function extractTemp(data) {
    data = data.filter(item => item.type=='Temp')
    data.sort((a,b) => b.id - a.id);
    let record = data[0];
    let temp = record.value;
    animateText("#water-temperature", temp, 2);
}

setInterval(function(){
    fetch('http://192.168.0.129:8080/api/measurement')
    .then(response => response.json())
    .then(data => {
        // extractFlow(data);
        extractTemp(data);
    })

    fetch('https://run.mocky.io/v3/594328c2-3f28-462a-a9b0-94cd842c9ccd')
    .then(response => response.json())
    .then(data => {
        animateText("#water-flow", data.flow, 2);
    })
}, 1000);