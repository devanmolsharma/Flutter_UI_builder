class Block {
  protected static counter = 0;
  private _name: string;
  private _id: number;
  private _children: Block[] = [];
  private _widget: Widget;

  public get children(): Block[] {
    return this._children;
  }
  public set children(value: Block[]) {
    this._children = value;
  }

  constructor(widget: Widget, name = "", children?: Block[]) {
    this._name = name;
    this._widget = widget;
    this._id = Block.counter;

    if (children) {
      this._children = children;
    }

    Block.counter++;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get widget(): Widget {
    return this._widget;
  }

  public set widget(value: Widget) {
    this._widget = value;
  }

  public get id(): number {
    return this._id;
  }

  public simpleParams() {
    return this._widget.params?.filter(
      (prop) => prop.type.class != "List<Widget>" && prop.type.class != "Widget"
    );
  }

  public widgetListParams() {
    return this._widget.params?.filter(
      (prop) => prop.type.class == "List<Widget>"
    );
  }

  public widgetParams(unset = false) {
    return this._widget.params?.filter((prop) => {
      if (prop.type.class == "Widget") {
        if (!unset) {
          return true;
        } else {
          if (!this._children.map((c) => c.name).includes(prop.name)) {
            return true;
          }
        }
      }
    });
  }

  public addChild(name: string, widget: Widget) {
    const child = new Block(widget, name);
    this._children.push(child);
  }

  public multipleWidgetsParams() {
    return this._widget.params?.filter(
      (prop) => prop.type.class == "List<Widget>"
    );
  }

  public clone() {
    return new Block(this._widget, this._name, this._children);
  }

  public buildTree(): Widget {
    let copy = structuredClone(this.widget);
    copy.params?.forEach((param, i) => {
      if (param.type.class == "Widget") {
        const child = this._children.find((child) => child.name == param.name);
        if (child) copy.params![i].value = child.buildTree();
      }
    });

    return copy;
  }
}

export default Block;
