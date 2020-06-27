// 把風味的data改成下列格式，text裡面是utf-8的格式，其實還是中文，但也可以直接貼中文進去
// count決定放大縮小的程度
let data = [
    {
        "text": "finish",
        "count": 1054
    },
    {
        "text": "palate",
        "count": 1045
    },
    {
        "text": "nose",
        "count": 999
    },
    {
        "text": "vanilla",
        "count": 889
    },
    {
        "text": "notes",
        "count": 781
    },
    {
        "text": "whisky",
        "count": 713
    },
    {
        "text": "sweet",
        "count": 638
    },
    {
        "text": "oak",
        "count": 574
    },
    {
        "text": "spice",
        "count": 488
    },
    {
        "text": "whiskey",
        "count": 449
    },
    {
        "text": "honey",
        "count": 432
    },
    {
        "text": "fruits",
        "count": 425
    },
    {
        "text": "spices",
        "count": 422
    },
    {
        "text": "smoke",
        "count": 416
    },
    {
        "text": "caramel",
        "count": 384
    },
    {
        "text": "chocolate",
        "count": 382
    },
    {
        "text": "rye",
        "count": 362
    },
    {
        "text": "fruit",
        "count": 334
    },
    {
        "text": "flavors",
        "count": 325
    },
    {
        "text": "wood",
        "count": 320
    },
    {
        "text": "cinnamon",
        "count": 300
    },
    {
        "text": "like",
        "count": 291
    },
    {
        "text": "bit",
        "count": 288
    },
    {
        "text": "dark",
        "count": 277
    },
    {
        "text": "well",
        "count": 266
    },
    {
        "text": "peat",
        "count": 265
    },
    {
        "text": "along",
        "count": 262
    },
    {
        "text": "sweetness",
        "count": 260
    },
    {
        "text": "dried",
        "count": 251
    },
    {
        "text": "rich",
        "count": 251
    },
    {
        "text": "pepper",
        "count": 247
    },
    {
        "text": "spicy",
        "count": 244
    },
    {
        "text": "long",
        "count": 242
    },
    {
        "text": "malt",
        "count": 238
    },
    {
        "text": "touch",
        "count": 232
    },
    {
        "text": "light",
        "count": 229
    },
    {
        "text": "orange",
        "count": 217
    },
    {
        "text": "citrus",
        "count": 217
    },
    {
        "text": "dry",
        "count": 210
    },
    {
        "text": "also",
        "count": 209
    },
    {
        "text": "floral",
        "count": 205
    },
    {
        "text": "aromas",
        "count": 202
    },
    {
        "text": "one",
        "count": 193
    },
    {
        "text": "taste",
        "count": 192
    },
    {
        "text": "bourbon",
        "count": 191
    },
    {
        "text": "sugar",
        "count": 188
    },
    {
        "text": "toffee",
        "count": 182
    },
    {
        "text": "aroma",
        "count": 181
    },
    {
        "text": "soft",
        "count": 171
    },
    {
        "text": "toasted",
        "count": 167
    }
];

// 把svg的長寬給固定，在這邊調整
let width = 1280; // window.innerWidth;
let height = 720; // window.innerHeight;

function draw() {
    d3.layout.cloud()
        .size([width, height])
        .words(data)
        .padding(5)
        .rotate(0)
        .font('"微軟正黑體",Impact')
        .fontSize(data => {
            return window.parseFloat(Math.log10(data.count).toFixed(2)) * 16.5;
        })
        .on("end", drawWordCloud).start();
}

function drawWordCloud() {
    let fill = d3.scaleOrdinal(d3.schemeCategory10);
    let tooltip = d3.select('#chart').append('div').attr('class', 'tooltip').style('opacity', 0);

    d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2 - 75) + ', ' + (height / 2) + ')')
        .selectAll('text')
        .data(data) // 實際data的輸入位置
        .enter()
        .append('text')
        .style('font-size', data => {
            return window.parseFloat(Math.pow(data.count, 0.66).toFixed(2)) * 0.66; // 這邊會依據data的count數量大小做調整
                                                                                // 但我這邊有取log再乘上純量倍數，避免文字雲
                                                                                // 的內容過於稀疏或壅擠
        })
        .style('font-family', '"微軟正黑體", Impact')
        .style('fill', (data, index) => fill(index))
        .attr('text-anchor', 'middle')
        .on('mouseover', data => {
            tooltip.transition()
                .duration(200)
                .style('opacity', 1);
            tooltip.html('風味屬性:' + data.text + '<br/>' + '數值總和:' + data.count)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY) + 'px');
        })
        .on('mouseout', data => {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        })
        .transition()
        .duration(750)
        .delay(150)
        .attr("transform", data => "translate(" + [data.x, data.y] + ")rotate(" + data.rotate + ")")
        .text(data => data.text);
}
window.addEventListener('load', draw, false);