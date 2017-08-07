import Backbone = require('backbone');
import _ = require("lodash")
import { Util } from "../Utils/Util"
export interface IViewConfig {
    tagName: string | null | undefined,
    className: string | null | undefined,
    el: HTMLElement | SVGAElement,
    $el: JQuery | undefined
    style: IViewStyle
}
export interface IViewStyle {
    position: string | null | undefined,
    left: string | null | undefined,
    right: string | null | undefined,
    top: string | null | undefined,
    bottom: string | null | undefined,
    width: string | null | undefined,
    height: string | null | undefined
}
const defaultConfig: IViewConfig ={
            tagName:"div",
            el: undefined,
            $el: undefined,
            className:undefined,
            style: {
                position: "absolute",
                left: "0px",
                right: "0px",
                top: "0px",
                bottom: "0px",
                width: null,
                height: null
            }
        }
export class View extends Backbone.View<Backbone.Model>{
    constructor(conf?) {
        super(_.extend({},defaultConfig,conf))
        this.style(_.extend({},defaultConfig.style,(conf||{}).style))      
    }
getNode$() {
    return this.$el
}
getNode() {
    return this.el
}
getContentNode() {
    return this.el
}
getContentNode$() {
    return this.$el
}
attr(obj) {
    this.$el.attr(obj)
    return this
}
setDate(o: string | Object, v ?: string) {
    if (_.isString(o)) {
        this.model.set(o, v)
    }
    if (_.isObject(o)) {
        this.model.set(o)
    }
    return this
}
style(obj) {
    _.each(obj, (v: string, k: string) => {
        if (v) {
            this.$el.css(k, v)
        } else {
            this.$el.css(k, "")
        }
    })

    return this
}
setClass(cls: string) {
    //this.$el.removeClass()
    if (_.isArray(cls)) {
        _.each(cls, (v: string) => {
            this.$el.addClass(v)
        })
    }
    if (_.isString(cls)) {
        this.$el.addClass(cls)
    }
}
addClass(cls) {
    if (cls) {
        this.$el.addClass(cls)
    }
    return this
}
removeClass(cls) {
    this.$el.removeClass(cls)
    return this
}
toogleClass(cls) {
    this.$el.toggleClass(cls)
    return this
}
appendAt(dom) {
    this.invokeBeforeRender()
    this.render()
    this.getNode$().appendTo(dom)
    this.invokeAterRender()
}
onAfterRender() { }
onBeforeRender() { }
invokeAterRender() {
    if (this.onAfterRender) {
        this.onAfterRender()
    }
    return this
}
invokeBeforeRender() {
    if (this.onBeforeRender) {
        setTimeout(() => {
            this.onBeforeRender()
        })

    }
}
setModel(m) {
    this.model = m
    this.listenTo(this.model, "change", this.render)
    return this
}
doRender() {
    this.invokeBeforeRender()
    this.render()
    this.invokeAterRender()
}
setBusy(busy: boolean, size ?) {
    if (busy) {
        this.$el.append(Util.loader.genBallBusy(size || .5))
    } else {
        this.$(".busyContainer").remove()
    }
}
}