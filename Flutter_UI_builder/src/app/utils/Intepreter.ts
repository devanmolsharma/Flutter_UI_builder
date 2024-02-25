import Block from "../Block";

class Interpreter {
  static basicTypes = [
    "bool",
    "int",
    "double",
    "String",
    "Widget",
    "List<Widget>",
  ];
  static convertPropertyJsonToCode(prop: Property): string {
    const name = prop.name;
    const value = prop.value;

    if (Interpreter.basicTypes.indexOf(prop.type.class) != -1) {
      if (!value) {
        return "null";
      }
      if (name == "value") {
        return `${value}`;
      }
      return `${name} = ${value}`;
    }

    if (prop.enum) {
      if (!value) {
        return "null";
      }
      return `${name} = ${value}`;
    }

    let subProps = prop.type.params
      ?.map((subProp) => this.convertPropertyJsonToCode(subProp))
      .filter((i) => i != "null");

    if (subProps && subProps.length > 0) {
      return `${name} = ${prop.type.class}(${subProps})`;
    }
    return "null";
  }

  static compileBlock(block: Block) {
    const widget = block.widget;
    let base = widget.name + "(";
    let simpleParams = block.simpleParams();
    let widgetParams = block.widgetParams();
    let widgetListParams = block.widgetListParams();
    widgetParams?.forEach((p) => {
      let child = block.children.find((b) => (b.name == p.name));
      if (child) base += p.name + "=" + this.compileBlock(child) + ",";
    });

    widgetListParams?.forEach((p) => {
      let children = block.children.filter((b) => (b.name == p.name));
      if (children.length > 0) {
        base += p.name + "= [";
        children.forEach((child) => {
          base += this.compileBlock(child) + ",";
        });
        base += "],";
      }

      simpleParams?.forEach((param) => {
        let compiledProp = this.convertPropertyJsonToCode(param);
        if (compiledProp != "null") {
          base += compiledProp;
          base += ",";
        }
      });
    });

    base += ")";
    return base;
  }
}

export default Interpreter;
