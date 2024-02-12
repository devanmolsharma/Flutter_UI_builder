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

    constructor(widget: Widget, name = '', children?: Block[]) {
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

    public widgetParams() {
        return this._widget.params?.filter((prop) => prop.type.class == "Widget")
    }

    public multipleWidgetsParams() {
        return this._widget.params?.filter((prop) => prop.type.class == 'List<Widget>')
    }

    public buildTree(): Widget {
        let copy = structuredClone(this.widget);
        copy.params?.forEach((param, i) => {
            if (param.type.class == 'Widget') {
                const child = this._children.find((child) => child.name == param.name)
                if (child)
                    copy.params![i].value = child.buildTree()
            }
        })

        return copy;

    }


}


type Property = {
    "name": string,
    "type": {
        "class": "double" | "int" | "String" | "bool" | "List<Widget>" | "Widget",
        "isFunction": boolean,
        "params": Property[] | null
    },
    "value": null | string | Widget,
    "required": boolean,
    "enum": boolean
};

type Properties  = Property[] | null;

type Widget = {
    name: string, params: Properties
};