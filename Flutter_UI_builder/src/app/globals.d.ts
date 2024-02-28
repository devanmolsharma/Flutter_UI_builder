type Property = {
  name: string;
  type: {
    class:
      | "double"
      | "int"
      | "String"
      | "bool"
      | "List<Widget>"
      | "Widget"
      | "VoidCallback";
    isFunction: boolean;
    params: Property[] | null;
  };
  value: null | string | Widget;
  default: null | string | Widget;
  required: boolean;
  positional: boolean;
  enum: boolean;
};

type Properties = Property[] | null;

type Widget = {
  name: string;
  params: Properties;
};
