import React, { useRef, useState, useEffect } from 'react';
import go from 'gojs';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [numberOfInputs, setNumberOfInputs] = useState(1);
  const [lengthInput, setLengthInput] = useState('');
  const [inputValues1, setInputValues1] = useState(Array.from({ length: numberOfInputs }, () => ''));
  const [inputValues2, setInputValues2] = useState(Array.from({ length: numberOfInputs }, () => ''));
  const [inputValues3, setInputValues3] = useState(Array.from({ length: numberOfInputs }, () => ''));
  const [inputValues4, setInputValues4] = useState(Array.from({ length: numberOfInputs }, () => ''));
  const [val, setVal] = useState(Array.from({ length: numberOfInputs }, () => ''));
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [linkDataArray, setLinkDataArray] = useState([]);
  const [successorDebut, setSuccessorDebut] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalLink, setShowModalLink] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLengthInput(value);
  };

  const generateInputs = () => {
    setInputValues1(Array.from({ length: lengthInput }, () => ''));
    setInputValues2(Array.from({ length: lengthInput }, () => ''));
    setInputValues3(Array.from({ length: lengthInput }, () => ''));
    setNumberOfInputs(lengthInput + 1);
  };

  const handleInputValueChange1 = (index, value) => {
    const newInputValues1 = [...inputValues1];
    newInputValues1[index] = value;
    setInputValues1(newInputValues1);
  };

  const handleInputValueChange2 = (index, value) => {
    const newInputValues2 = [...inputValues2];
    newInputValues2[index] = value;
    setInputValues2(newInputValues2);
  };

  const handleInputValueChange3 = (index, value) => {
    const newInputValues3 = [...inputValues3];
    newInputValues3[index] = value;
    setInputValues3(newInputValues3);
  };

  const handleInputValueChange4 = (index, value) => {
    const newInputValues4 = [...inputValues4];
    newInputValues4[index] = value;
    setInputValues4(newInputValues4);
  };

  const handleInputValueChange = (index, value) => {
    const newInputValues = [...val];
    newInputValues[index] = value;
    setVal(newInputValues);
  };

  const generateSuccessorTasks = () => {
    const successorTasks = [];

    for (let i = 0; i < numberOfInputs; i++) {
      const currentTask = inputValues1[i];
      const successors = [];

      for (let j = 0; j < numberOfInputs; j++) {
        const anterieurTasks = inputValues3[j].split(',').map(task => task.trim());

        if (anterieurTasks.includes(currentTask)) {
          successors.push(inputValues1[j]);
        }
      }

      if (successors.length === 0) {
        successors.push("FIN");
      }

      const successorString = successors.join(',');
      successorTasks.push(successorString);
    }

    setInputValues4(successorTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valeurs des inputs Groupe 1:', inputValues1);
    console.log('Valeurs des inputs Groupe 2:', inputValues2);
    console.log('Valeurs des inputs Groupe 3:', inputValues3);
    console.log('Valeurs des inputs Groupe 4 (Tâches successeur):', inputValues4);
  };

  const [showGraph, setShowGraph] = useState(false);
  const diagramRef = useRef(null);

  const index1 = 1;
  const [indexEnd, setIndexEnd] = useState(50);

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
      { padding: 0.5, defaultRowSeparatorStroke: "black", defaultColumnSeparatorStroke: "black" },
      $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
      $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
      $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: "white", coversSeparators: true }),
      $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
      $(go.TextBlock,
        new go.Binding("text", "earlyStart"),
        { row: 0, column: 0, margin: 2, textAlign: "center", font: "12px sans-serif" }),
      $(go.TextBlock,
        new go.Binding("text", "length"),
        { row: 0, column: 1, margin: 2, textAlign: "center", font: "12px sans-serif" }),
      $(go.TextBlock,
        new go.Binding("text", "", d => Math.round(d.earlyStart + d.length)),
        { row: 0, column: 2, margin: 2, textAlign: "center", font: "12px sans-serif" }),

      $(go.TextBlock,
        new go.Binding("text", "text"),
        {
          row: 1, column: 0, columnSpan: 3, margin: 2,
          textAlign: "center", font: "bold 12px sans-serif"
        }),

      $(go.TextBlock,
        new go.Binding("text", "", d => Math.round(d.lateFinish - d.length)), // Marge totale
        { row: 2, column: 0, margin: 2, textAlign: "center", font: "12px sans-serif" }),

      $(go.TextBlock,
        new go.Binding("text", "", d => Math.round(d.lateFinish - d.earlyStart)), // Marge libre
        { row: 2, column: 1, margin: 2, textAlign: "center", stroke: "green", font: "12px sans-serif" }),  // Set the stroke color to green
      $(go.TextBlock,
        new go.Binding("text", "lateFinish"),
        { row: 2, column: 2, margin: 2, textAlign: "center", font: "12px sans-serif" })
    )
  );

      diagram.linkTemplate =
      $(go.Link,
        {
          toShortLength: 6, toEndSegmentLength: 20,
          // click: (e, link) => alert(`Link clicked: from ${link.data.from} to ${link.data.to}`)
        },
        $(go.Shape, { strokeWidth: 2 },
          new go.Binding("stroke", "", linkColorConverter)),
        $(go.Shape,
          { toArrow: "Triangle", stroke: null, scale: 1 },
          new go.Binding("fill", "", linkColorConverter)),
        $(go.Panel, "Auto",
          $(go.Shape, "RoundedRectangle", { fill: "white", strokeWidth: 1 }),
          $(go.TextBlock, { margin: 3 },
            new go.Binding("text", "length"))
        )
      );

      diagram.addDiagramListener("ObjectSingleClicked", (e) => {
        const part = e.subject.part;
        if (!(part instanceof go.Link)) {
          setSelectedNode(part.data);
          setShowModal(true);
        } else {
          setSelectedLink(part.data);
          setShowModalLink(true);
          console.log("part.data",part.data)
        }
      });

    let nodeDataArray = [];
    let linkDataArray = [];

    if (inputValues4.length > 0) {
      // Add the DEBUT node
      nodeDataArray.push({ key: index1, text: "DEBUT", length: 0, earlyStart: 0, lateFinish: 0, critical: true });

      // Determine successors of DEBUT
      const successorDebut = [];
      for(let i = 0; i < inputValues3.length; i++){
        if(inputValues3[i] == '-'){
          successorDebut.push(inputValues1[i]);
        }
      }
      setSuccessorDebut(successorDebut.join(','));
      for(let i = 0; i<successorDebut.length; i++){
      const successorIndex = inputValues1.indexOf(successorDebut[i]);
        if (successorIndex >= 0) {
          linkDataArray.push({ from: index1, to: successorIndex + 1, length: 0 });
        }
      }

      // Add nodes and links dynamically
      inputValues4.forEach((value, i) => {
        nodeDataArray.push({
          key: i + 1,
          text: inputValues1[i],
          length: parseInt(inputValues2[i], 10),
          earlyStart: 0,
          lateFinish: 0,
          critical: false
        });

        if (i !== 0) {
          inputValues3[i].split(',').forEach(prevTask => {
            const prevIndex = inputValues1.indexOf(prevTask.trim());
            if (prevIndex >= 0) {
              const linkLength = parseInt(inputValues2[prevIndex], 10);
              linkDataArray.push({ from: prevIndex + 1, to: i + 1, length: linkLength });
            }
          });
        }
      });

      // Add the FIN node
      nodeDataArray.push({ key: indexEnd, text: "FIN", length: 0, earlyStart: 0, lateFinish: 0, critical: true });

      // Link the last task to FIN
      const lastTaskIndex = [];
      for(let i = 0; i < inputValues4.length; i++){
      if(inputValues4[i] == 'FIN'){
        lastTaskIndex.push(inputValues1[i]);
      }
      }
      lastTaskIndex.forEach(taskIndex => {
      const index = inputValues1.indexOf(taskIndex);
      if (index >= 0) {
        linkDataArray.push({ from: index + 1, to: indexEnd, length: inputValues2[index]});
      }
      });
    }

    nodeDataArray = nodeDataArray.filter(node => !isNaN(node.length) && node.text !== "");

    const calculateEarliestStartTimes = (nodes, links) => {
      const graph = {};
      nodes.forEach(node => {
        graph[node.key] = {
          length: node.length || 0,
          earliestStart: node.earliestStart || 0,
          incoming: [],
          outgoing: []
        };
      });
  
      links.forEach(link => {
        graph[link.from].outgoing.push(link.to);
        graph[link.to].incoming.push(link.from);
      });
  
      const calculateEarliest = (node) => {
        if (graph[node].incoming.length === 0) {
          graph[node].earliestStart = 0;
        } else {
          graph[node].earliestStart = Math.max(...graph[node].incoming.map(n => graph[n].earliestStart + graph[n].length));
        }
        graph[node].outgoing.forEach(calculateEarliest);
      };
  
      nodes.forEach(node => {
        if (graph[node.key].incoming.length === 0) {
          calculateEarliest(node.key);
        }
      });
  
      console.log("Earliest Start Times:", graph);
      nodes.forEach(node => {
        if (graph[node.key]) {
          node.earlyStart = graph[node.key].earliestStart;
        }
      });
    };

    const calculateLatestFinishTimes = (nodes, links) => {
      const graph = {};
      nodes.forEach(node => {
        graph[node.key] = {
          length: node.length || 0,
          latestFinish: Math.max(...nodes.map(n => n.earlyStart)),
          incoming: [],
          outgoing: []
        };
      });
    
      links.forEach(link => {
        graph[link.from].outgoing.push(link.to);
        graph[link.to].incoming.push(link.from);
      });
    
      // Définir la dernière date de fin comme étant la plus grande date de début la plus tôt + durée du projet
      const projectEndTime = Math.max(...nodes.map(n => n.earlyStart));
    
      // Initialiser les nœuds finaux avec la dernière date de fin du projet
      nodes.forEach(node => {
        if (graph[node.key].outgoing.length === 0) {
          graph[node.key].latestFinish = projectEndTime;
        }
      });
    
      const calculateLatest = (nodeKey) => {
        const node = graph[nodeKey];
        if (node.outgoing.length === 0) return projectEndTime;
    
        //Calculer la dernière date de fin pour le nœud en cours
        node.latestFinish = Math.min(...node.outgoing.map(outKey => {
          const outNode = graph[outKey];  
          console.log(outNode.length)
        return outNode.latestFinish - outNode.length;
        }));
    
        // Appeler récursivement la fonction pour les nœuds entrants
        node.incoming.forEach(calculateLatest);
      };
    
      // Parcourir les nœuds en ordre inverse pour calculer les `latestFinish`
      nodes.slice().reverse().forEach(node => {
        if (graph[node.key].outgoing.length == 0) {
          return;
        }
        calculateLatest(node.key);
      });
    
      console.log("Latest Finish Times:", graph);
    
      // Mettre à jour les nœuds avec les valeurs calculées
      nodes.forEach(node => {
        if (graph[node.key]) {
          node.lateFinish = graph[node.key].latestFinish;
        }
      });
    };
    
      

    calculateEarliestStartTimes(nodeDataArray, linkDataArray)
    // calculateLateFinish(nodeDataArray, linkDataArray)
    calculateLateFin(nodeDataArray, linkDataArray);
    calculateSlack(nodeDataArray, linkDataArray);
    findCriticalPath(nodeDataArray, linkDataArray);

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    function linkColorConverter(linkdata, elt) {
      const link = elt.part;
      if (!link) return "#0288D1";
      const fromNode = link.fromNode;
      const toNode = link.toNode;
      if (!fromNode || !fromNode.data || !toNode || !toNode.data) return "#0288D1";
      return (fromNode.data.critical && toNode.data.critical) ? "#B71C1C" : "#0288D1";
    }
    
    function calculateLateFin(nodeDataArray, linkDataArray) {
      let nodeMap = {};
      console.log("linkDataArray", linkDataArray);
      console.log("nodeDataArray", nodeDataArray);
    
      // Initialiser la map des nœuds
      nodeDataArray.forEach(node => {
        nodeMap[node.key] = node;
        // Initialiser lateFinish à Infinity pour permettre la mise à jour correcte
        node.lateFinish = Infinity;
      });
    
      // Assurer que le noeud FIN ait un lateFinish égal à son earlyFinish
      let finNode = nodeDataArray.find(node => node.text === "FIN");
      if (finNode) {
        finNode.lateFinish = finNode.earlyStart;
      }
    
      function recalculateLateFinish() {
        linkDataArray.reverse().forEach(link => {
          let fromNode = nodeMap[link.from];
          let toNode = nodeMap[link.to];
          let arcValue = parseInt(link.length, 10); // Prendre la valeur de l'arc directement
    
          if (isNaN(arcValue)) {
            console.error(`Valeur d'arc de la liaison ${link.from} -> ${link.to} est NaN`);
            arcValue = 0; // Si la valeur est NaN, la définir à 0 pour éviter les erreurs
          }
    
          // Mettre à jour lateFinish pour le nœud fromNode
          let calculatedLateFinish = toNode.lateFinish - arcValue;
          if (fromNode.lateFinish > calculatedLateFinish) {
            fromNode.lateFinish = calculatedLateFinish;
          }
        });
      }
    
      // Premier calcul des lateFinish
      recalculateLateFinish();
    
      // Vérifier et recalculer les nœuds restants avec des valeurs Infinity
      let nodesToRecalculate = nodeDataArray.filter(node => node.lateFinish === Infinity);
      while (nodesToRecalculate.length > 0) {
        // Pour chaque nœud avec lateFinish = Infinity, le définir comme la somme de ses earlyStart et length
        nodesToRecalculate.forEach(node => {
          node.lateFinish = node.earlyStart + node.length;
        });
  
        recalculateLateFinish();
    
        // Re-vérifier les nœuds ayant encore une valeur Infinity
        nodesToRecalculate = nodeDataArray.filter(node => node.lateFinish === Infinity);
      }
      // let err = nodeDataArray.find(node=>node.text === "A");
      // if(err){err.lateFinish = 9}
      
        // Nouvelle vérification pour les nœuds avec des lateFinish incorrects
      let needsRecalculation = true;
      while (needsRecalculation) {
        needsRecalculation = false;

    linkDataArray.forEach(link => {
      let fromNode = nodeMap[link.from];
      let toNode = nodeMap[link.to];
      let arcValue = parseInt(link.length, 10);

      if (isNaN(arcValue)) {
        arcValue = 0;
      }

      // Vérifier si la date au plus tard du nœud fromNode est supérieure à celle de toNode
      if (fromNode.lateFinish > toNode.lateFinish - arcValue) {
        fromNode.lateFinish = toNode.lateFinish - arcValue;
        needsRecalculation = true;
      }
    });

    if (needsRecalculation) {
      recalculateLateFinish();
    }
  }

      // Si le nœud DEBUT est inclus, mettre à jour son lateFinish à 0
      let debutNode = nodeDataArray.find(node => node.text === "DEBUT");
      if (debutNode) {
        debutNode.lateFinish = 0;
      }

      console.log("Updated nodeDataArray with lateFinish:", nodeDataArray);
      console.log(getNodeData(-23));
    }
    

    //calculer lateFinish
    function calculateLateFinish(nodeDataArray, linkDataArray) {
      let nodeMap = {};
      console.log("linkDataArray",linkDataArray)
      console.log("nodeDataArray",nodeDataArray)

      // Initialiser la map des nœuds
      nodeDataArray.forEach(node => {
      nodeMap[node.key] = node;
      // Initialiser lateFinish à 0 pour chaque nœud pour éviter NaN
      node.lateFinish = 0;
      });
    
      // Assurer que le noeud FIN ait un lateFinish égal à son earlyFinish
      let finNode = nodeDataArray.find(node => node.text === "FIN");
      if (finNode) {
      finNode.lateFinish = finNode.earlyStart;
      }
    
      // Parcourir chaque lien à l'envers pour calculer lateFinish
      let successorLateFinishMap = {};
      let successorCounts = {};

      // Parcourir linkDataArray pour remplir successorLateFinishMap et successorCounts
      linkDataArray.forEach(link => {
      let fromNodeKey = link.from;
      let toNodeKey = link.to;
      let arcValueL = parseInt(link.length, 10); // Prendre la valeur de l'arc directement

      // Initialiser les tableaux si nécessaire
      if (!successorLateFinishMap[fromNodeKey]) {
        successorLateFinishMap[fromNodeKey] = [];
      }

      if (!successorCounts[fromNodeKey]) {
        successorCounts[fromNodeKey] = 0;
      }

      // Ajouter lateFinish du toNode au tableau du fromNode
      let toNodeLateFinish = nodeMap[toNodeKey].lateFinish;
      if (isNaN(toNodeLateFinish)) {
        console.error(`lateFinish de la tâche ${toNodeKey} est NaN`);
      }

      successorLateFinishMap[fromNodeKey].push(toNodeLateFinish-arcValueL);
      successorCounts[fromNodeKey]++;
      });
      // Étape 2 : Mettre à jour lateFinish pour les nœuds ayant plus d'un successeur
      linkDataArray.reverse().forEach(link => {
        let fromNode = nodeMap[link.from];
        let toNode = nodeMap[link.to];
        let arcValue = parseInt(link.length, 10); // Prendre la valeur de l'arc directement
        console.log(arcValue)
        if (isNaN(toNode.lateFinish)) {
          console.error(`lateFinish de la tâche ${toNode.key} est NaN`);
          toNode.lateFinish = 0;
        }

        if (isNaN(arcValue)) {
          console.error(`Valeur d'arc de la liaison ${link.from} -> ${link.to} est NaN`);
          arcValue = 0;
        }

        let nodeFrom = getNodeData(link.from)
        let nodeTo = getNodeData(link.to)
        let datePlusTard = nodeTo.lateFinish - arcValue
        if (nodeFrom.lateFinish>datePlusTard){
          fromNode.lateFinish=datePlusTard
        //console.log(fromNode.lateFinish)
        }
        else{
          fromNode.lateFinish=datePlusTard
        }
        console.log(getNodeData(1));
      });
    }
    

    function getNodeData(key){
      return nodeDataArray.filter(node => node.key === key)[0];
    }

    function calculateSlack(nodeDataArray, linkDataArray) {
      nodeDataArray.forEach(node => {
        node.slack = node.lateFinish - node.earlyStart;
      });
    }

    function findCriticalPath(nodeDataArray, linkDataArray) {
      nodeDataArray.forEach(node => {
        node.critical = node.slack === 0;
      });
    }    

    return () => {
      diagram.div = null;
    };
  }, [inputValues4, inputValues1, inputValues2, inputValues3]);
  
  function modifyL(){
    let updatedInputValues2 = inputValues2.map((value, index) => {
      if (inputValues1[index] === selectedNode.text) {
        console.log("inputValues1[index]",inputValues1[index])
        inputValues2[index] = selectedNode.length;
      }
    });
  }
  function modifLinkValue() {
    console.log("selectedLink.length:", selectedLink.length); // For debugging
  
    const targetIndex = inputValues2.findIndex(value => value === selectedLink.length);
    console.log("targetIndex",targetIndex)
    if (targetIndex !== -1) {
      // Found a match in inputValues2
      const correspondingValue = findLByKey(targetIndex + 1); // Key correction
      console.log("findLByKey(targetIndex + 1):", correspondingValue); // Display the name
  
      // Optional: Update inputValues1 if needed (consider side effects)
      // inputValues1[targetIndex] = selectedLink.length; // Uncomment if necessary
    } else {
      console.log("Value", selectedLink.length, "not found in inputValues2");
    }
  }
  function modifyLinkValue() {
    console.log("selectedLink.length:", selectedLink.length); // For debugging
  
    const targetIndex = inputValues2.findIndex(value => value === selectedLink.length);
    console.log("targetIndex",targetIndex)
    if (inputValues2[targetIndex] == selectedLink.length) {
      console.log("findLByKey(targetIndex)",findLByKey(targetIndex)) //je veux afficher le Nom ayant ce lien
  
      //console.log("Updated inputValues1:", inputValues2[targetIndex]); // For debugging
    } else {
      console.log("Value", selectedLink.length, "not found in inputValues1");
    }
  }
  
  function handleSave() {
    modifyL();
    if (selectedNode) {
      const newNodes = nodeDataArray.map(node => {
        if (node.key === selectedNode.key) {
          return selectedNode;
        }
        return node;
      });
      setNodeDataArray(newNodes);
    }
    
    if (selectedLink) {
      const newLinks = linkDataArray.map(link => {
        if (link.key === selectedLink.key) {
          return selectedLink;
        }
        return link;
      });

      setLinkDataArray(newLinks);
    }
    setShowModal(false);
  }
  function getNodeTextByKey() {
    const node = nodeDataArray.find(node => node.key === 0);
    return node ? node.text : '';
    console.log("node",node) 
  }
  function findByKey(key){
    if(key>0) {return inputValues1[key-1] }
  }
  function findLByKey(key){
    return inputValues1[key-1]
  }
  const handleClose = () => {setShowModal(false); setShowModalLink(false)};

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <label htmlFor="numberOfInputs" style={{fontSize:'18px'}}>Nombre des Tâches:</label>
          <input
            type="number"
            id="numberOfInputs"
            value={lengthInput}
            onChange={handleInputChange}
            min="1"
            style={{ width: '70px', height: '40px' }}
          />
          <Button variant='primary' onClick={generateInputs} >Entrer</Button>
        </div>
        <br /><br />
        <div style={{ display: 'flex' }}>
          <h4 style={{ margin: '0 0 0 20px' }}>Tâches:</h4>
          <div style={{ marginLeft: '150px' }}>
            {Array.from({ length: numberOfInputs }, (_, index) => (
              <input
                key={index}
                type="text"
                value={index === 0 ? 'DEBUT' : inputValues1[index]}
                onChange={(e) => handleInputValueChange1(index, e.target.value)}
                style={{ width: '50px', height: '30px', textAlign: 'center',fontSize:'13px' }}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <h4 style={{ margin: '0 0 0 20px' }}>Durée:</h4>
          <div style={{ marginLeft: '160px' }}>
            {Array.from({ length: numberOfInputs }, (_, index) => (
              <input
                key={index}
                type="text"
                value={index === 0 ? '0' : inputValues2[index]}
                onChange={(e) => handleInputValueChange2(index, e.target.value)}
                style={{ width: '50px', height: '30px', textAlign: 'center' }}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <h4 style={{ marginLeft: '20px' }}>Tâches antérieures:</h4>
          <div style={{ marginLeft: '24px' }}>
            {Array.from({ length: numberOfInputs }, (_, index) => (
              <textarea
                key={index}
                type="text"
                value={inputValues3[index]}
                onChange={(e) => handleInputValueChange3(index, e.target.value)}
                disabled={index === 0}
                style={{ width: '50px', height: '60px', resize: 'none', textAlign: 'center' }}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <h4 style={{ marginLeft: '20px' }}>Tâches successeurs:</h4>
          <div style={{ marginLeft: '18px',marginTop:'-6px' }}>
            {Array.from({ length: numberOfInputs }, (_, index) => (
              <textarea
                key={index}
                type="text"
                value={index ===0 ? successorDebut : inputValues4[index]}
                onChange={(e) => handleInputValueChange4(index, e.target.value)}
                style={{ width: '50px', height: '60px', resize: 'none', textAlign: 'center' }}
              />
            ))}
          </div>
        </div>
        <Button variant='primary' onClick={generateSuccessorTasks} style={{marginLeft:'30px'}} >Générer Tâches successeur</Button>
        <Button variant='primary' onClick={() => { setShowGraph(true); }} style={{marginLeft:'60px'}}>Générer Graph</Button>
      </form>

      {showGraph &&
        <div ref={diagramRef} nodeDataArray={nodeDataArray} linkDataArray={linkDataArray} style={{ width: '100%', height: '500px' }} />
      }
      
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedNode && (
          <>
            <div>
              <label htmlFor="formNodeText">Tâche </label>
              <input
                id="formNodeText"
                type="text"
                value={selectedNode.text}
                onChange={(e) => setSelectedNode({ ...selectedNode, text: e.target.value })}
                style={{marginLeft:'15px', border:'none'}} disabled
              />
            </div>
            <div>
              <label htmlFor="formNodeLength">Durée </label>
              <input
                id="formNodeLength"
                type="number"
                value={selectedNode.length}
                onChange={(e) => setSelectedNode({ ...selectedNode, length: parseInt(e.target.value, 10) })}
                style={{marginLeft:'14px'}}
              />
            </div>
          </>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalLink} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un lien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedLink && (
          <>
            <div>
              <label htmlFor="formLinkFrom">Venant de</label>
              <input id="formLinkFrom" type="text" value={findByKey(parseInt(selectedLink.from))?findByKey(parseInt(selectedLink.from)):"DEBUT"} 
                style={{marginLeft:'15px'}} disabled
              />
            </div>
            <div>
              <label htmlFor="formLinkTo">Pour </label>
              <input id="formLinkTo" type="text" value={findLByKey(parseInt(selectedLink.to))?findLByKey(parseInt(selectedLink.to,10)):"FIN"} 
                style={{marginLeft:'53px'}} disabled
              />
            </div>
            <div>
              <label htmlFor="formLinkTo">Valeur </label>
              <input id="formLinkTo" type="text" value={selectedLink.length} style={{marginLeft:'40px'}}
                onChange={(e)=>setSelectedLink({...selectedLink, length: parseInt(e.target.value, 10)})}
              />
            </div>
          </>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={modifLinkValue }>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
