(function () { 
    if (!mstrmojo.plugins.apex_chart) {
        mstrmojo.plugins.apex_chart = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.CustomVisBase",
        "mstrmojo.models.template.DataInterface",
        "mstrmojo.vi.models.editors.CustomVisEditorModel"
    );

    mstrmojo.plugins.apex_chart.apex_chart = mstrmojo.declare(
        mstrmojo.CustomVisBase,
        null,
        {
            scriptClass: "mstrmojo.plugins.apex_chart.apex_chart",
            cssClass: "apex_chart",
            errorMessage: "При формуванні візуалізації сталася помилка, або недостатньо даних. ",
            errorDetails: "Ця візулізація потребує 1 атрибут та хоча б 1 метрику",
            externalLibraries: [{url:"file://../plugins/apex_chart/javascript/mojo/js/source/main.js"},{url:"file://../plugins/apex_chart/javascript/mojo/js/source/external/apex.js"}],
            useRichTooltip: false,
            reuseDOMNode: false,
            supportNEE: true,
            plot:function(){


                main(this);
            






}})}());
//@ sourceURL=apex_chart.js