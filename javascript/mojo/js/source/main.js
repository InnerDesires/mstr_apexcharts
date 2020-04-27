let g_mstrApi;
const dataModeRows = mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS;
const dataModeRowsAdv = mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS_ADV;

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
    let data = gridData.getRawData(dataModeRowsAdv);
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
    /* g_mstrApi.setDefaultPropertyValues({
        'line': false,
        'area': true,
        'bar': false
    }) */

    return g_mstrApi.getProperties();

}


function setDefaults() {

}


function alertObj(obj) {
    alert(JSON.stringify(obj));
}