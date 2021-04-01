import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  title = 'flowChart';
  assignNodes =false;
  //category
  subjectName = "Maths";

  root = {id:0, parent_id: null, children: []};
  node_list = { 0 : this.root};
  

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
  text: any;
  indexOfElement: any;

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

  selectAllItems() {
    this.selected = new Set(this.sourceArray);
  }

  assignNodesFunction(){
this.assignNodes=true;
 this.selectedArray = Array.from(this.selected);
  }

  sendTheNewValue(event,indexOfElement){
  this.text = event;
  this.indexOfElement = indexOfElement;
  for(let i=0;i<this.selectedArray.length;i++){
    if(this.indexOfElement==i){
        this.treeModel.push({id: this.indexOfElement,parent_id: i, children: []});
      }
  }
  console.log("🚀 ~ file: app.component.ts ~ line 74 ~ AppComponent ~ sendTheNewValue ~ this.treeModel", this.treeModel)
  // var myJsonString = JSON.stringify(this.treeModel);
  // console.log("🚀 ~ file: app.component.ts ~ line 63 ~ AppComponent ~ sendTheNewValue ~ myJsonString", myJsonString)

  for (let i = 0; i < this.treeModel.length; i++) {
    this.node_list[this.treeModel[i].id] = this.treeModel[i];
    this.node_list[this.treeModel[i].parent_id].children.push(this.node_list[this.treeModel[i].id]);
}
console.log("🚀 ~ file: app.component.ts ~ line 71 ~ AppComponent ~ sendTheNewValue ~ this.node_list", this.node_list)

}




}
