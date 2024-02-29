import Block from "../Block";

class Compiler {
  static basicTypes = [
    "bool",
    "int",
    "double",
    "String",
    "Widget",
    "List<Widget>",
  ];

  static format(data: string, type: string) {
    if (type == "String" && !data.includes("'")) return `'${data}'`;
    else return `${data}`;
  }

  static convertPropertyJsonToCode(prop: Property): string {
    if (prop.value == prop.default && (prop.enum || this.basicTypes.includes(prop.type.class))) {
      return "null";
    }
    const name = prop.name;
    const value = prop.value;

    if (Compiler.basicTypes.indexOf(prop.type.class) != -1 || prop.enum) {
      if (!value) {
        return "null";
      }

      if (prop.positional) {
        return `${Compiler.format(value as string, prop.type.class)}`;
      }

      return `${name} : ${Compiler.format(value as string, prop.type.class)}`;
    }

    let subProps = prop.type.params
      ?.map((subProp) => this.convertPropertyJsonToCode(subProp))
      .filter((i) => i != "null");

    if (subProps && subProps.length > 0) {
      return `${name} : ${prop.type.class}(${subProps})`;
    }
    return "null";
  }

  static compileBlock(block: Block) {
    const widget = block.widget;

    let base = widget.name + "(";
    let simpleParams = block.simpleParams();
    let functionParams = block.functionParams();
    let widgetParams = block.widgetParams();
    let widgetListParams = block.widgetListParams();

    widgetParams?.forEach((p) => {
      let child = block.children.find((b) => b.name == p.name);
      if (child) base += p.name + ":" + this.compileBlock(child) + ",";
    });

    widgetListParams?.forEach((p) => {
      let children = block.children.filter((b) => b.name == p.name);
      if (children.length > 0) {
        base += p.name + ": [";
        children.forEach((child) => {
          base += this.compileBlock(child) + ",";
        });
        base += "],";
      }
    });

    simpleParams?.forEach((param) => {
      let compiledProp = Compiler.convertPropertyJsonToCode(param);

      if (compiledProp != "null") {
        base += compiledProp;
        base += ",";
      }
    });

    functionParams?.forEach((param) => {
      if (param.required || param.value) {
        base += `${param.name}:()=>{/*${param.value || ''}*/},`;
      }
    });

    base += ")";
    return base;
  }
}

export default Compiler;
