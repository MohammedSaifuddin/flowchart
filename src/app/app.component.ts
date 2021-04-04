import { Component } from '@angular/core';

import { layout, graphlib, GraphLabel, Node, Edge, NodeConfig, EdgeConfig } from 'dagre';

declare module 'dagre' {
  function layout(graph: graphlib.Graph, opts?: Partial<GraphLabel & NodeConfig & EdgeConfig>);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  //Graph Code
  g: graphlib.Graph;
  nodes = [];
  edges = [];

  constructor() {
  }
  
  title = 'flowChart';
  assignNodes =false;
  //category
  subjectName = "Maths";

  // root = {id:0, parent_id: null, children: []};
  // node_list = { 0 : this.root};
  

  //sub category
  sourceArray = [
    'Stats',
    'Numbers',
    'Geometry',
    'Calculus',
  ];
  selectedArray=[];
  selected = new Set();

  treeModel =[];
  alternateTreeModel =[];
  text: any;
  indexOfElement: any;
  parentSubCategoryText: any;
  childSubCategoryIndex: any;
  selectedArrayCopy: unknown[];
  childSubCategoryText: any;
  showGraphStatus: boolean;

  toggleItem(item: string) {
      this.selected.add(item);
      this.RemoveElementFromArray(item);
    if(this.sourceArray.length==0){
      this.assignNodesFunction();
    }
  }
  RemoveElementFromArray(element: string) {
    this.sourceArray.forEach((value,index)=>{
        if(value==element) this.sourceArray.splice(index,1);
    });
}
RemoveElementFromSelected(element: string) {
  this.selected.delete(element);
}

AddElementToArray(element: string) {
  this.sourceArray.push(element);
  this.RemoveElementFromSelected(element);
}
RemoveElementFromSeledtedArayArray(element: string) {
  this.selectedArrayCopy.forEach((value,index)=>{
      if(value==element) this.selectedArrayCopy.splice(index,1);
  });
}


  selectAllItems() {
    this.selected = new Set(this.sourceArray);
  }

  assignNodesFunction(){
    console.log("🚀 ~ file: app.component.ts ~ line 60 ~ AppComponent ~ selectAllItems ~ this.selected", this.selected)
this.assignNodes=true;
 this.selectedArray = Array.from(this.selected);
 this.selectedArrayCopy = Array.from(this.selected);
  }

  selectRootNode(ParentSubCategoryValue,childSubCategoryIndex){
    this.parentSubCategoryText = ParentSubCategoryValue;
    this.childSubCategoryIndex = childSubCategoryIndex;
    let parentSubCategoryIndex;
    for(let i=0;i<this.selectedArray.length;i++){
      if(this.parentSubCategoryText==this.selectedArray[i]){
        parentSubCategoryIndex = i;
        }
    }
    this.treeModel.push({id: 0,parentId: null, children: []});
  
    console.log("🚀 ~ file: app.component.ts ~ line 74 ~ AppComponent ~ sendTheNewValue ~ this.treeModel", this.treeModel)
    var myJsonString = JSON.stringify(this.treeModel);
    console.log("🚀 ~ file: app.component.ts ~ line 63 ~ AppComponent ~ sendTheNewValue ~ myJsonString", myJsonString)
  // this.RemoveElementFromSeledtedArayArray(this.parentSubCategoryText)
   
  }

  sendTheNewValue(ParentSubCategoryValue,childSubCategoryText,childSubCategoryIndex){
  this.parentSubCategoryText = ParentSubCategoryValue;
  this.childSubCategoryIndex = childSubCategoryIndex;
  this.childSubCategoryText = childSubCategoryText;
  let parentSubCategoryIndex;
  let parentSubCategoryText;
  for(let i=0;i<this.selectedArray.length;i++){
    if(this.parentSubCategoryText==this.selectedArray[i]){
      parentSubCategoryText = this.selectedArray[i];
      }
  }
  this.treeModel.push({id: this.childSubCategoryIndex,parentId: parentSubCategoryIndex, children: []});
  this.alternateTreeModel.push({FromNode: parentSubCategoryText, toNode: this.childSubCategoryText,label: ''});
  console.log("🚀 ~ file: app.component.ts ~ line 107 ~ AppComponent ~ sendTheNewValue ~ this.alternateTreeModel", this.alternateTreeModel)

  console.log("🚀 ~ file: app.component.ts ~ line 74 ~ AppComponent ~ sendTheNewValue ~ this.treeModel", this.treeModel)
  var myJsonString = JSON.stringify(this.treeModel);
  console.log("🚀 ~ file: app.component.ts ~ line 63 ~ AppComponent ~ this.treeModel ~ myJsonString", myJsonString)
  var myJsonString1 = JSON.stringify(this.alternateTreeModel);
  console.log("🚀 ~ file: app.component.ts ~ line 63 ~ AppComponent ~ this.alternateTreeModel ~ myJsonString", myJsonString1)
//[{"id":1,"parentId":4,"children":[]},{"id":2,"parentId":1,"children":[]},{"id":3,"parentId":4,"children":[]},{"id":4,"parentId":3,"children":[]}]
 
}

completeForLoop(){
  this.showGraph();
const idMapping = this.treeModel.reduce((acc, el, i) => {
  acc[el.id] = i;
  return acc;
}, {});
console.log("🚀 ~ file: app.component.ts ~ line 108 ~ AppComponent ~ idMapping ~ idMapping", idMapping)

let root;
this.treeModel.forEach(el => {
  // Handle the root element
  if (el.parentId === null) {
    root = el;
    return;
  }
  // Use our mapping to locate the parent element in our data array
  const parentEl = this.treeModel[idMapping[el.parentId]];
  // Add our current el to its parent's `children` array
  parentEl.children = [...(parentEl.children || []), el];
});
console.log(root);

this.showGraph();
}

showGraph() {
  this.showGraphStatus = true;

  this.g = new graphlib.Graph();

  const g = this.g;

  g.setGraph({ nodesep: 15, ranksep: 50, rankdir: 'BT' });

  g.setDefaultEdgeLabel(function () { return {}; });

  for(let i=0;i<this.selectedArray.length;i++){
  g.setNode(this.selectedArray[i], { label: this.selectedArray[i], width: 180, height: 24 });
  // g.setNode("Stats", { label: "Stats", width: 180, height: 24 });
  // g.setNode("Geometry", { label: "Geometry", width: 180, height: 24 });
  // g.setNode("Numbers", { label: "Numbers", width: 180, height: 24 })
  }
  for(let i=0;i<this.alternateTreeModel.length;i++){
    g.setEdge(this.alternateTreeModel[i].toNode, this.alternateTreeModel[i].FromNode);

  }
  // g.setEdge("Stats", "Geometry");
  // g.setEdge("Geometry", "Stats");
  // g.setEdge("Numbers", "Geometry");

  layout(g);

  this.nodes = g.nodes();
  this.edges = g.edges();
}

nodeInfo(nodeName: string) {
  return this.g.node(nodeName);
}

edgeInfo(edge: Edge) {
  return this.g.edge(edge);
}

makePath(points: { x: number, y: number }[]) {
  const point = points[0];
  points.splice(0, 1);
  return `M${point.x} ${point.y}` + points.map(({ x, y }) => `L${x} ${y}`).join(' ') + `l0 -12`;
}

}



