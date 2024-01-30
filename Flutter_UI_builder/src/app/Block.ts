export default class Block {
    protected static counter = 0;
    private _name: string;
    private _id: number;
    private children: Block[] = [];
    private _widget: Widget;

    constructor(widget: Widget, name = '', children?: Block[]) {
        this._name = name;
        this._widget = widget;
        this._id = Block.counter;

        if (children) {
            this.children = children;
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

    public buildTree(): Widget {
        let copy = structuredClone(this.widget);
        copy.params?.forEach((param, i) => {
            if (param.type.class == 'Widget') {
                const child = this.children.find((child) => child.name == param.name)
                if (child)
                    copy.params![i].value = child.buildTree()
            }
        })
        
        return copy;

    }


}