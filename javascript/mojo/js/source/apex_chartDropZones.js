(function () { 
    if (!mstrmojo.plugins.apex_chart) {
        mstrmojo.plugins.apex_chart = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.vi.models.CustomVisDropZones",
        "mstrmojo.array"
    );

    mstrmojo.plugins.apex_chart.apex_chartDropZones = mstrmojo.declare(
        mstrmojo.vi.models.CustomVisDropZones,
        null,
        {
            scriptClass: "mstrmojo.plugins.apex_chart.apex_chartDropZones",
            cssClass: "apex_chartdropzones",
            getCustomDropZones: function getCustomDropZones(){
  return [ 
 { 
name: "Атрибут", 
maxCapacity:1, 
title:"Зона для атрибута", 
allowObjectType:1
 }, { 
name: "Метрики", 
maxCapacity:10, 
title:"Зона для метрик", 
allowObjectType:2
 }
 ];},
            shouldAllowObjectsInDropZone: function shouldAllowObjectsInDropZone(zone, dragObjects, idx, edge, context) {
 











            },
            getActionsForObjectsDropped: function getActionsForObjectsDropped(zone, droppedObjects, idx, replaceObject, extras) {
 











            },
            getActionsForObjectsRemoved: function getActionsForObjectsRemoved(zone, objects) { 
 











            },
            getDropZoneContextMenuItems: function getDropZoneContextMenuItems(cfg, zone, object, el) {
 











            }
})}());
//@ sourceURL=apex_chartDropZones.js