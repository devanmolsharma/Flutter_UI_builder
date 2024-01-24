const Names = [
    "ElevatedButton",
    "FilledButton",
    "OutlinedButton",
    "TextButton",
    "AbsorbPointer",
    "AlertDialog",
    "Align",
    "AnimatedAlign",
    "AnimatedBuilder",
    "AnimatedContainer",
    "AnimatedCrossFade",
    "AnimatedDefaultTextStyle",
    "AnimatedList",
    "AnimatedListState",
    "AnimatedModalBarrier",
    "AnimatedOpacity",
    "AnimatedPhysicalModel",
    "AnimatedPositioned",
    "AnimatedSize",
    "AnimatedWidget",
    "AppBar",
    "AspectRatio",
    "AssetBundle",
    "Autocomplete",
    "BackdropFilter",
    "Badge",
    "Baseline",
    "BottomAppBar",
    "BottomSheet",
    "BottomNavigationBar",
    "BottomSheet",
    "Card",
    "Center",
    "Checkbox",
    "Chip",
    "CircularProgressIndicator",
    "ClipOval",
    "ClipPath",
    "ClipRect",
    "Column",
    "ButtonStyle",
    "ConstrainedBox",
    "Container",
    "CupertinoActionSheet",
    "CupertinoActivityIndicator",
    "CupertinoAlertDialog",
    "CupertinoButton",
    "CupertinoContextMenu",
    "CupertinoDatePicker",
    "CupertinoDialogAction",
    "CupertinoFullscreenDialogTransition",
    "CupertinoListSection",
    "CupertinoListTile",
    "CupertinoNavigationBar",
    "CupertinoPageScaffold",
    "CupertinoPageTransition",
    "CupertinoPicker",
    "CupertinoPopupSurface",
    "CupertinoScrollbar",
    "CupertinoSearchTextField",
    "CupertinoSegmentedControl",
    "CupertinoSlider",
    "CupertinoSlidingSegmentedControl",
    "CupertinoSliverNavigationBar",
    "CupertinoSwitch",
    "CupertinoTabBar",
    "CupertinoTabScaffold",
    "CupertinoTabView",
    "CupertinoTextField",
    "CupertinoTimerPicker",
    "CustomMultiChildLayout",
    "CustomPaint",
    "CustomScrollView",
    "CustomSingleChildLayout",
    "DataTable",
    "showDatePicker.html",
    "DecoratedBox",
    "DecoratedBoxTransition",
    "DefaultTextStyle",
    "Dismissible",
    "Divider",
    "DragTarget",
    "Draggable",
    "DraggableScrollableSheet",
    "Drawer",
    "DropdownButton",
    "ElevatedButton",
    "ExcludeSemantics",
    "Expanded",
    "ExpansionPanel",
    "FloatingActionButton.extended.html",
    "FadeTransition",
    "FittedBox",
    "FloatingActionButton",
    "Flow",
    "FlutterLogo",
    "Form",
    "FormField",
    "FractionalTranslation",
    "FractionallySizedBox",
    "FutureBuilder",
    "GestureDetector",
    "GridView",
    "Hero",
    "Icon",
    "IconButton",
    "IgnorePointer",
    "Image",
    "ImplicitlyAnimatedWidget",
    "IndexedStack",
    "InteractiveViewer",
    "IntrinsicHeight",
    "IntrinsicWidth",
    "LayoutBuilder",
    "LimitedBox",
    "LinearProgressIndicator",
    "ListBody",
    "ListTile",
    "ListView",
    "LongPressDraggable",
    "MaterialApp",
    "MediaQuery",
    "PopupMenuButton",
    "MergeSemantics",
    "NavigationRail",
    "NavigationBar",
    "NavigationDrawer",
    "Navigator",
    "NestedScrollView",
    "NotificationListener",
    "Offstage",
    "Opacity",
    "OutlinedButton",
    "OverflowBox",
    "Padding",
    "PageView",
    "Placeholder",
    "PopupMenuButton",
    "PositionedTransition",
    "Radio",
    "RawImage",
    "RawKeyboardListener",
    "RefreshIndicator",
    "ReorderableListView",
    "RichText",
    "RotatedBox",
    "RotationTransition",
    "Row",
    "Scaffold",
    "ScaleTransition",
    "ScrollConfiguration",
    "Scrollable",
    "Scrollbar",
    "SegmentedButton",
    "Semantics",
    "SimpleDialog",
    "SingleChildScrollView",
    "SizeTransition",
    "SizedBox",
    "SizedOverflowBox",
    "SlideTransition",
    "Slider",
    "SliverAppBar",
    "SliverChildBuilderDelegate",
    "SliverChildListDelegate",
    "SliverFixedExtentList",
    "SliverGrid",
    "SliverList",
    "SliverPadding",
    "SliverPersistentHeader",
    "SliverToBoxAdapter",
    "SnackBar",
    "Stack",
    "Stepper",
    "StreamBuilder",
    "Switch",
    "TabBar",
    "TabBarView",
    "TabController",
    "TabPageSelector",
    "Table",
    "Text",
    "TextButton",
    "TextField",
    "Theme",
    "showTimePicker.html",
    "Tooltip",
    "Transform",
    "WidgetsApp",
    "Wrap"
]

// List of data types to keep and replace in class names
const typesToKeep = ['bool', 'int', 'double', "String", "Widget", "List<Widget>"];
const replacements = { 'IconData': 'Icons' }

// Data structures to store parsed information
let elementParameterMap = [];
let enumMap = {};
let parsedClassesMap = {};
let parser = new DOMParser();

// List of classes to skip during parsing
const skipClasses = ['Key', 'BuildContext', 'DiagnosticLevel', 'DiagnosticsTreeStyle'];

// Function to parse a parameter
async function parseParam(param, recursion) {
    if (param.includes("Deprecated") || param.includes("→") || param.length < 4) {
        return null;
    }

    var splittedParam = param.replace("{", "").replace("}", "").split(" ");
    const required = splittedParam[0] == "required";

    if (required) {
        splittedParam = splittedParam.slice(1)
    }

    const parsedType = { class: splittedParam[0].replace("?", ""), isFunction: splittedParam[1].startsWith("on"), params: [] };
    if (replacements[parsedType.class]) {
        parsedType.class = replacements[parsedType.class];
    }

    // Skip certain classes
    for (const c of skipClasses) {
        if (parsedType.class == c) {
            return null;
        }
    }

    const isEnum = await parseEnum(parsedType.class);
    const isPrimaryType = typesToKeep.includes(parsedType.class);

    // Parse sub-parameters for non-primary types
    subParams = null;
    if (!isPrimaryType) {
        if (recursion > 0) {
            subParams = await parseClass(parsedType.class, recursion - 1);
        }
    }

    parsedType.params = subParams;

    let defaultVal = param.includes("=") ? splittedParam[3] : null;
    if(parsedType.isFunction && required && (defaultVal == null)){
        defaultVal = "()=>{}"
    }

    // Return parsed parameter information
    if ((isEnum) || (isPrimaryType) || (subParams && (subParams.length > 0)))
        return {
            name: splittedParam[1],
            type: parsedType,
            default: defaultVal,
            required: required,
            enum: isEnum,
        }
}

// Function to parse a class
async function parseClass(name, recursion = 3) {
    // Check if the class has already been parsed
    if (Object.keys(parsedClassesMap).includes(name)) {
        return parsedClassesMap[name];
    }

    try {
        // Fetch class information from Flutter documentation
        let classUrlBase = 'https://api.flutter.dev/flutter/' + await query(name);
        let res = await fetch(classUrlBase);

        if (res.status == 200) {
            // Parse HTML document and extract parameter information
            doc = parser.parseFromString(await res.text(), 'text/html');
            let j = [];
            doc.querySelectorAll(`#${name} .parameter`).forEach((E, i) => j[i] = E.innerText.split(',')[0])

            let filtered = [];
            for (let i = 0; i < j.length; i++) {
                let param = await parseParam(j[i], recursion);
                if (param != null) {
                    filtered.push(param);
                }
            }
            // Cache parsed information for future use
            parsedClassesMap[name] = filtered;
            return filtered;
        }
    } catch (error) {
        // Handle errors during parsing
    }

    // Cache null value for the class if parsing fails
    parsedClassesMap[name] = null;
    return null;
}

// Memory cache for parsed enum classes
mem = {};

// Function to parse an enum class
async function parseEnum(className) {
    // Check if the enum has already been parsed
    if (Object.keys(mem).includes(className)) {
        return mem[className];
    }

    try {
        // Fetch enum information from Flutter documentation
        let classUrlBase = 'https://api.flutter.dev/flutter/' + await query(className);
        let res = await fetch(classUrlBase);

        if (res.status == 200) {
            // Parse HTML document and extract enum values
            doc = parser.parseFromString(await res.text(), 'text/html');
            let j = [];
            doc.querySelectorAll('#values span.name , #constants span.name').forEach((a, i) => j[i] = a.innerText);

            if (j.length > 0) {
                // Cache enum values for future use
                enumMap[className] = j.filter(v => v != 'values');
                mem[className] = true;
                return true;
            }
        }

        // Cache false value if enum parsing fails
        mem[className] = false;
    } catch (error) {
        // Handle errors during enum parsing
    }
    return false;
}

// Function to get attributes for a list of names
async function getAttributes() {
    let count = 0;
    const total = Names.length;
    Names.forEach(
        async (name, i) => {
            try {
                params = await parseClass(name);
                // Parse class and store the result in elementParameterMap
                params && elementParameterMap.push({ name: name, params:  params});
            } catch (error) {
                // Handle errors during parsing
            }
            count ++;

            console.log(count+'/' +total+ "done");
        }
    )
}
