let g_mstrApi;

let APEX_PROPERTIES = {
    showLegend: {
        str: 'showLegend',
        default: 'true'
    },
    sparkline: {
        name: 'sparkline',
        default: 'false'
    },
    hideToolbar: {
        str: 'hideToolbar',
        default: 'false'
    },
    lineType: {
        str: 'lineType',
        default: 'smooth'
    },
    chartType: {
        str: 'chartType',
        default: 'area'
    },
    barDirection: {
        str: 'barDirection',
        default: 'horizontal'
    },
    isStacked: {
        str: 'isStacked',
        default: 'false'
    },
    verticalAxesesLabels: {
        str: 'verticalAxesesLabels',
        default: 'true'
    }
};

function main(mstrApi) {
    if (typeof mstrApi == 'object') {
        g_mstrApi = mstrApi;
        visNode = g_mstrApi.domNode;
        mstrApi.domNode.innerHTML = '';
    } else {
        alert(`Error. Mstr API wasn't provided to the main function`);
        throw new Error();
    }

    let props = prepareVisOptions();
    let data = getData();
    if (!props['chartType']) {
        props['chartType'] = 'line';
    }

    var options = {
        colors: ['#057B48', '#91C964', '#F8D490', '#F69C91', '#46AFE6', '#005591', '#4C4C4E'],
        series: data.apexOptionsData.series,
        legend: {
            show: props['showLegend'] ? (props['showLegend'] === "true") : false
        },
        chart: {
            sparkline: {
                enabled: props['sparkline'] ? (props['sparkline'] === "true") : false
            },
            type: props['chartType'],
            height: `${parseInt(visNode.style.height) - 10}px`,

            toolbar: {
                show: !(props['hideToolbar'] ? (props['hideToolbar'] === "true") : false),
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: props['lineType'] ? props['lineType'] : 'straight'
        },
        xaxis: {
            categories: data.apexOptionsData.categories[0].data,
        },
    };

    if (props['chartType'] === 'bar') {
        options['plotOptions'] = {};
        options['plotOptions']['bar'] = {};
        options['plotOptions']['bar']['horizontal'] = props['barDirection'] ? props['barDirection'] === 'horizontal' : false;
        options['chart']['stacked'] = props['isStacked'] ? props['isStacked'] === 'true' : false;
    }
    window.chart = new ApexCharts(g_mstrApi.domNode, options);
    window.chart.render();
}


function getData() {
    let gridData = g_mstrApi.dataInterface;
    let data = gridData.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS_ADV);
    let numberOfRows = gridData.getTotalRows();
    let dataInfo = {
        apexOptionsData: {
            series: [],
            categories: []
        },
        attributeTitles: [],
        metricTitles: []
    }

    data[0].headers.forEach((header, i) => {
        let attrTitle = gridData.getRowTitles().getTitle(i).getName();

        dataInfo.attributeTitles.push(attrTitle);
        dataInfo.apexOptionsData.categories.push({
            name: attrTitle,
            data: []
        });
    })

    data[0].values.forEach((value, i) => {
        let metricTitle = gridData.getColHeaders(0).getHeader(i).getName();

        dataInfo.metricTitles.push(metricTitle);
        dataInfo.apexOptionsData.series.push({
            name: metricTitle,
            data: []
        });
    })

    for (let n = 0; n < numberOfRows; n++) {
        // Getting the values of the attributes
        data[n].headers.forEach((header, i) => {
            dataInfo.apexOptionsData.categories[i].data.push(header.name);
            //dataInfo.processedData[n][dataInfo.attributeTitles[i]] = header.name;
        })
        // Getting the values of zthe metrics
        data[n].values.forEach((value, i) => {
            dataInfo.apexOptionsData.series[i].data.push(value.rv);
            //dataInfo.processedData[n][dataInfo.metricTitles[i]] = value.rv;
        })
    }
    return dataInfo;
}

function prepareVisOptions() {
    let is10Point2 = true;
    if (typeof g_mstrApi.addThresholdMenuItem == 'function') {
        is10Point2 = false;
    }

    if (!is10Point2) {
        let obj = {};
        Object.keys(APEX_PROPERTIES).forEach(el => {
            obj[APEX_PROPERTIES[el].str] = APEX_PROPERTIES[el].default;
        })
        alert(obj.chartType);
        g_mstrApi.setDefaultPropertyValues(obj);
    }
    return g_mstrApi.getProperties();

}


function setDefaults() {

}


function alertObj(obj) {
    alert(JSON.stringify(obj));
}