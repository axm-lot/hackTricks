import React from 'react';
import { Graph } from 'react-d3-graph';

function GraphVisualization(){
// graph payload (with minimalist structure)
const data = {
    nodes: [
      { id: 'A', labelLeft: '12', labelCenter: 'A', labelRight: '5' },
      { id: 'B', labelLeft: '12', labelCenter: 'B', labelRight: '5' },
      { id: 'C', labelLeft: '12', labelCenter: 'C', labelRight: '5' },
      { id: 'D', labelLeft: '12', labelCenter: 'D', labelRight: '5' },
      { id: 'E', labelLeft: '12', labelCenter: 'E', labelRight: '5' },
      { id: 'F', labelLeft: '12', labelCenter: 'F', labelRight: '5' }
    ],
    links: [
      { source: 'A', target: 'B', label: '3 days' },
      { source: 'A', target: 'C', label: '5 days' },
      { source: 'B', target: 'D', label: '3 days' },
      { source: 'C', target: 'E', label: '5 days' },
      { source: 'E', target: 'F', label: '3 days' },
      { source: 'D', target: 'F', label: '5 days' },
    ]
  };

  // the graph configuration
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 2020,
      fontSize: 30,
      highlightStrokeColor: 'blue',
      renderLabel: true,
      labelProperty: node => {
        return `${node.labelLeft}\n${node.labelCenter}\n
        ${node.labelRight}`;
      },
      labelPosition: 'center',
      labelStyle: {
        fontSize: '12px'
      }
    },
    link: {
        highlightColor: 'lightblue',
        renderLabel: true, // Activer le rendu des labels sur les liens
        fontSize: 15, // Taille de police des labels sur les liens
        fontColor: 'black',
      }
};

// graph event callbacks
const onClickNode = function(nodeId) {
     window.alert('Clicked node ${nodeId}');
};

// const onMouseOverNode = function(nodeId) {
//      window.alert(`Mouse over node ${nodeId}`);
// };

// const onMouseOutNode = function(nodeId) {
//      window.alert(`Mouse out node ${nodeId}`);
// };

const onClickLink = function(source, target) {
     window.alert(`Clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
     window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
     window.alert(`Mouse out link between ${source} and ${target}`);
};

return(
    <Graph
     id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
     data={data}
     config={myConfig}
     onClickNode={onClickNode}
     onClickLink={onClickLink}
    //  onMouseOverNode={onMouseOverNode}
    //  onMouseOutNode={onMouseOutNode}
     onMouseOverLink={onMouseOverLink}
     onMouseOutLink={onMouseOutLink}/>
)
}
export default GraphVisualization;