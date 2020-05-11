(function () {
    if (!mstrmojo.plugins.apex_chart) {
        mstrmojo.plugins.apex_chart = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.vi.models.editors.CustomVisEditorModel",
        "mstrmojo.array"
    );

    mstrmojo.plugins.apex_chart.apex_chartEditorModel = mstrmojo.declare(
        mstrmojo.vi.models.editors.CustomVisEditorModel,
        null,
        {
            scriptClass: "mstrmojo.plugins.apex_chart.apex_chartEditorModel",
            cssClass: "apex_charteditormodel",
            getCustomProperty: function getCustomProperty() {


                var $WT = mstrmojo.vi.models.editors.CustomVisEditorModel.WIDGET_TYPE;

                return [{
                    name: 'Налаштування візуалізації',
                    value: [
                        {
                            style: $WT.EDITORGROUP,
                            items: [
                                {
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "showLegend",
                                    labelText: "Легенда"
                                },
                                {
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "sparkline",
                                    labelText: "Компактний вигляд"
                                },
                                {
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: "hideToolbar",
                                    labelText: "Приховати панель інструментів"
                                },
                                {
                                    style: $WT.TWOCOLUMN,
                                    disabled: (this.getHost().getProperty('chartType') === "bar" || this.getHost().getProperty('chartType') === "scatter"),
                                    items: [{
                                        style: $WT.LABEL,
                                        name: "text",
                                        width: "40%",
                                        labelText: "Тип ліній"

                                    },
                                    {
                                        style: $WT.PULLDOWN,
                                        propertyName: "lineType",
                                        width: "60%",
                                        items: [
                                            {
                                                name: "Прямі",
                                                value: "straight"
                                            }, {
                                                name: "Плавні",
                                                value: "smooth"
                                            },
                                            {
                                                name: "Прямокутні",
                                                value: "stepline"
                                            }
                                        ]
                                    }
                                    ]
                                },
                                {
                                    style: $WT.TWOCOLUMN,
                                    items: [
                                        {
                                            style: $WT.LABEL,
                                            name: "text",
                                            width: "40%",
                                            labelText: "Тип візуалізації"
                                        },
                                        {
                                            style: $WT.PULLDOWN,
                                            propertyName: "chartType",
                                            width: "60%",
                                            items: [{
                                                name: "Лінії",
                                                value: "line"
                                            },
                                            {
                                                name: "Площа",
                                                value: "area"
                                            },
                                            {
                                                name: "Стовпці",
                                                value: "bar"
                                            },
                                            {
                                                name: "Точки",
                                                value: 'scatter'
                                            }
                                            ]
                                        }
                                    ]
                                }, {
                                    style: $WT.TWOCOLUMN,
                                    disabled: !(this.getHost().getProperty('chartType') === "bar"),
                                    items: [{
                                        style: $WT.LABEL,
                                        width: "40%",
                                        labelText: "Напрямок стовпців: "
                                    }, {
                                        style: $WT.PULLDOWN,
                                        propertyName: "barDirection",
                                        width: "60%",
                                        items: [{
                                            name: "Вертикально",
                                            value: "vertical"
                                        },
                                        {
                                            name: "Горизонтально",
                                            value: "horizontal"
                                        }
                                        ]
                                    }]
                                }, {
                                    style: $WT.CHECKBOXANDLABEL,
                                    disabled: !(this.getHost().getProperty('chartType') === "bar"),
                                    propertyName: "isStacked",
                                    labelText: "Накладання стовпців"

                                }
                            ]
                        }
                    ]
                }, {
                    name: 'New editor page',
                    value: [
                        {
                            style: $WT.EDITORGROUP,
                            items: [
                                {
                                    labelText: 'Вертикальні підписи метрик', 
                                    style: $WT.CHECKBOXANDLABEL,
                                    propertyName: 'verticalAxesesLabels'
                                }
                            ]
                }
                ]
            }]
            // END getCustomProperties
        }
        })
}());
//@ sourceURL=apex_chartEditorModel.js