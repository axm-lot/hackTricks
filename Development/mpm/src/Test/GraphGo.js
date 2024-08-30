import React, { useRef, useEffect, useState } from 'react';
import go from 'gojs';

function GraphVisualization({ nodeDataArray, linkDataArray, updateNodeDataArray }) {
  const diagramRef = useRef(null);
  const index1 = 1;
  const [indexEnd, setIndexEnd] = useState(50)
  const [critical, setCritical] = useState(false);

  useEffect(() => {
    if (!diagramRef.current) return;

    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, diagramRef.current, {
      initialContentAlignment: go.Spot.Center,
      layout: $(go.LayeredDigraphLayout, { direction: 0 }),
    });

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Rectangle", { fill: "white", strokeWidth: 2 },
          new go.Binding("fill", "critical", b => b ? "#F8BBD0" : "#B3E5FC"),
          new go.Binding("stroke", "critical", b => b ? "#B71C1C" : "#0288D1")),
        $(go.Panel, "Table",
          { padding: 0.5 },
          $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: "white", coversSeparators: true }),
          $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
          $(go.TextBlock,
            new go.Binding("text", "earlyStart"),
            { row: 0, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "length"),
            { row: 0, column: 1, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "",
              d => (d.earlyStart + d.length).toFixed(2)),
            { row: 0, column: 2, margin: 5, textAlign: "center" }),

          $(go.TextBlock,
            new go.Binding("text", "text"),
            {
              row: 1, column: 0, columnSpan: 3, margin: 5,
              textAlign: "center", font: "bold 14px sans-serif"
            }),

          $(go.TextBlock,
            new go.Binding("text", "",
              d => (d.lateFinish - d.length).toFixed(2)),
            { row: 2, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "",
              d => (d.lateFinish - (d.earlyStart + d.length)).toFixed(2)),
            { row: 2, column: 1, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "lateFinish"),
            { row: 2, column: 2, margin: 5, textAlign: "center" })
        )
      );

    diagram.linkTemplate =
      $(go.Link,
        { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape, { strokeWidth: 4 },
          new go.Binding("stroke", "", linkColorConverter)),
        $(go.Shape,
          { toArrow: "Triangle", stroke: null, scale: 1.5 },
          new go.Binding("fill", "", linkColorConverter))
      );

    const nodeDataArray = [
      { key: index1, text: "DEBUT", length: 0, earlyStart: 0, lateFinish: 0, critical: true },
      { key: indexEnd, text: "FIN", length: 0, earlyStart: 0, lateFinish: 0, critical: true },
    ];
    const linkDataArray = [
      { from: index1, to: indexEnd },
    ];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    function linkColorConverter(linkdata, elt) {
      const link = elt.part;
      if (!link) return "#0288D1";
      const fromNode = link.fromNode;
      const toNode = link.toNode;
      if (!fromNode || !fromNode.data || !toNode || !toNode.data) return "#0288D1";
      return (fromNode.data.critical && toNode.data.critical) ? "#B71C1C" : "#0288D1";
    }

    return () => {
      diagram.div = null;
    };
  }, [nodeDataArray, linkDataArray, updateNodeDataArray]);

  return <div ref={diagramRef} style={{ width: '100%', height: '500px' }} />;
}

export default GraphVisualization;

