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