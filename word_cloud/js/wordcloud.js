// 把風味的data改成下列格式，text裡面是utf-8的格式，其實還是中文，但也可以直接貼中文進去
// count決定放大縮小的程度
let data = [
    {
        "text": "palate",
        "count": 2217
    },
    {
        "text": "finish",
        "count": 2122
    },
    {
        "text": "nose",
        "count": 1950
    },
    {
        "text": "notes",
        "count": 1666
    },
    {
        "text": "vanilla",
        "count": 1638
    },
    {
        "text": "sweet",
        "count": 1245
    },
    {
        "text": "oak",
        "count": 1027
    },
    {
        "text": "spice",
        "count": 938
    },
    {
        "text": "whisky",
        "count": 890
    },
    {
        "text": "flavors",
        "count": 884
    },
    {
        "text": "fruit",
        "count": 828
    },
    {
        "text": "spices",
        "count": 740
    },
    {
        "text": "honey",
        "count": 710
    },
    {
        "text": "caramel",
        "count": 681
    },
    {
        "text": "fruits",
        "count": 671
    },
    {
        "text": "smoke",
        "count": 655
    },
    {
        "text": "pepper",
        "count": 636
    },
    {
        "text": "bit",
        "count": 629
    },
    {
        "text": "cinnamon",
        "count": 619
    },
    {
        "text": "chocolate",
        "count": 609
    },
    {
        "text": "whiskey",
        "count": 601
    },
    {
        "text": "citrus",
        "count": 571
    },
    {
        "text": "sweetness",
        "count": 560
    },
    {
        "text": "orange",
        "count": 560
    },
    {
        "text": "well",
        "count": 555
    },
    {
        "text": "wood",
        "count": 554
    },
    {
        "text": "rich",
        "count": 536
    },
    {
        "text": "like",
        "count": 535
    },
    {
        "text": "aroma",
        "count": 535
    },
    {
        "text": "along",
        "count": 497
    },
    {
        "text": "light",
        "count": 496
    },
    {
        "text": "dried",
        "count": 486
    },
    {
        "text": "touch",
        "count": 481
    },
    {
        "text": "aromas",
        "count": 480
    },
    {
        "text": "rye",
        "count": 479
    },
    {
        "text": "long",
        "count": 479
    },
    {
        "text": "floral",
        "count": 468
    },
    {
        "text": "dark",
        "count": 450
    },
    {
        "text": "spicy",
        "count": 444
    },
    {
        "text": "dry",
        "count": 427
    },
    {
        "text": "sugar",
        "count": 408
    },
    {
        "text": "gin",
        "count": 399
    },
    {
        "text": "hint",
        "count": 398
    },
    {
        "text": "also",
        "count": 392
    },
    {
        "text": "fresh",
        "count": 385
    },
    {
        "text": "one",
        "count": 383
    },
    {
        "text": "flavor",
        "count": 380
    },
    {
        "text": "taste",
        "count": 372
    },
    {
        "text": "hints",
        "count": 358
    },
    {
        "text": "lemon",
        "count": 353
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
            return window.parseFloat(Math.log10(data.count).toFixed(2)) * 17.5;
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
        .attr('transform', 'translate(' + (width / 2) + ', ' + (height / 2) + ')')
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