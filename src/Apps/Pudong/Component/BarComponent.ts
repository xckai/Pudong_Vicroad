import { Component, IComponentConfig } from "../../../Jigsaw/Core/Component";
import _ = require("lodash")
import { NavBar, INavBarConfig } from "../../../Jigsaw/Controller/Bar/NavBar";
import { DivNode } from "../../../Jigsaw/Controller/DivNode/DivNode";
import { TitleNode } from "../../../Jigsaw/Controller/TitleNode/TitleNode";
export interface BarComponentConfig extends IComponentConfig {
    title?:string
}
export class BarComponent extends Component{
    constructor(c?:BarComponentConfig){
        super(c)
        this.bar=new NavBar({position:"absolute",left:"0px",right:"0px",bottom:"0px",top:"0px"})
        this.addController(this.bar)
        this.mainIcon=new DivNode({class:"sapLogo"})
        this.bar.addController(this.mainIcon)
        this.title=new TitleNode(_.pick(this.config,"title"))
        this.bar.addController(this.title)
    }
    config:BarComponentConfig
    defaultConfig(){
       return _.extend(super.defaultConfig(),{left:"0px",right:"0px",height:"3rem",top:"0px",position:"absolute",title:"交通概况",class:"barComponent"})
    }
    bar:NavBar
    mainIcon:DivNode
    title:TitleNode
}