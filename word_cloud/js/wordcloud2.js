// 把風味的data改成下列格式，text裡面是utf-8的格式，其實還是中文，但也可以直接貼中文進去
// count決定放大縮小的程度
let data = [
    {
        "text": "nose",
        "count": 2181
    },
    {
        "text": "finish",
        "count": 2100
    },
    {
        "text": "sweet",
        "count": 2033
    },
    {
        "text": "like",
        "count": 1794
    },
    {
        "text": "vanilla",
        "count": 1775
    },
    {
        "text": "notes",
        "count": 1481
    },
    {
        "text": "oak",
        "count": 1404
    },
    {
        "text": "one",
        "count": 1309
    },
    {
        "text": "taste",
        "count": 1220
    },
    {
        "text": "bottle",
        "count": 1198
    },
    {
        "text": "bourbon",
        "count": 1188
    },
    {
        "text": "spice",
        "count": 1181
    },
    {
        "text": "good",
        "count": 1157
    },
    {
        "text": "palate",
        "count": 1153
    },
    {
        "text": "bit",
        "count": 1117
    },
    {
        "text": "smoke",
        "count": 1050
    },
    {
        "text": "little",
        "count": 1043
    },
    {
        "text": "caramel",
        "count": 983
    },
    {
        "text": "whisky",
        "count": 941
    },
    {
        "text": "smooth",
        "count": 915
    },
    {
        "text": "peat",
        "count": 888
    },
    {
        "text": "honey",
        "count": 858
    },
    {
        "text": "get",
        "count": 845
    },
    {
        "text": "really",
        "count": 832
    },
    {
        "text": "whiskey",
        "count": 827
    },
    {
        "text": "Nose",
        "count": 826
    },
    {
        "text": "light",
        "count": 804
    },
    {
        "text": "sweetness",
        "count": 802
    },
    {
        "text": "much",
        "count": 782
    },
    {
        "text": "fruit",
        "count": 780
    },
    {
        "text": "nice",
        "count": 758
    },
    {
        "text": "flavor",
        "count": 738
    },
    {
        "text": "long",
        "count": 709
    },
    {
        "text": "price",
        "count": 697
    },
    {
        "text": "rye",
        "count": 693
    },
    {
        "text": "would",
        "count": 681
    },
    {
        "text": "first",
        "count": 645
    },
    {
        "text": "well",
        "count": 639
    },
    {
        "text": "hint",
        "count": 638
    },
    {
        "text": "cinnamon",
        "count": 629
    },
    {
        "text": "chocolate",
        "count": 618
    },
    {
        "text": "great",
        "count": 601
    },
    {
        "text": "sherry",
        "count": 577
    },
    {
        "text": "dram",
        "count": 566
    },
    {
        "text": "spicy",
        "count": 565
    },
    {
        "text": "time",
        "count": 556
    },
    {
        "text": "water",
        "count": 556
    },
    {
        "text": "dark",
        "count": 547
    },
    {
        "text": "flavors",
        "count": 521
    },
    {
        "text": "scotch",
        "count": 516
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
            return window.parseFloat(Math.log10(data.count).toFixed(2)) * 14;
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
        .attr('transform', 'translate(' + (width / 2 - 100) + ', ' + (height / 2) + ')')
        .selectAll('text')
        .data(data) // 實際data的輸入位置
        .enter()
        .append('text')
        .style('font-size', data => {
            return window.parseFloat(Math.pow(data.count, 0.6).toFixed(2)) * 0.6; // 這邊會依據data的count數量大小做調整
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