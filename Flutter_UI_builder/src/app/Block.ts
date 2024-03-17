class Block {
  protected static counter = 0;
  name: string;
  id: number;
  children: Block[] = [];
  widget: Widget;

  constructor(widget: Widget, name = "", children?: Block[]) {
    this.name = name;
    this.widget = structuredClone(widget);
    this.id = Block.counter;

    if (children) {
      this.children = children;
    }

    Block.counter++;
  }

  simpleParams() {    
    return this.widget.params?.filter(
      (prop) => prop.type.class != "List<Widget>" && prop.type.class != "Widget"
    );
  }

  functionParams() {
    return this.widget.params?.filter((prop) => prop.type.isFunction);
  }

  widgetListParams() {
    return this.widget.params?.filter(
      (prop) => prop.type.class == "List<Widget>"
    );
  }

  widgetParams(unset = false) {
    return this.widget.params?.filter((prop) => {
      if (prop.type.class == "Widget") {
        if (!unset) {
          return true;
        } else {
          if (!this.children.map((c) => c.name).includes(prop.name)) {
            return true;
          }
        }
      }
    });
  }

  addChild(name: string, widget: Widget) {
    const child = new Block(widget, name);
    this.children.push(child);
  }

  multipleWidgetsParams() {
    return this.widget.params?.filter(
      (prop) => prop.type.class == "List<Widget>"
    );
  }

  clone() {
    return new Block(this.widget, this.name, this.children);
  }

  buildTree(): Widget {
    let copy = structuredClone(this.widget);
    copy.params?.forEach((param, i) => {
      if (param.type.class == "Widget") {
        const child = this.children.find((child) => child.name == param.name);
        if (child) copy.params![i].value = child.buildTree();
      }
    });

    return copy;
  }
}

export default Block;
