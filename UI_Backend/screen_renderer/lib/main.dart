import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App',
      home: const MyHomePage(title: 'Anmols'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          TextButton(
            child: Text(
              'Hola!',
            ),
            focusNode: FocusNode(
                skipTraversal: false,
                canRequestFocus: true,
                descendantsAreFocusable: true,
                descendantsAreTraversable: true),
            autofocus: false,
            clipBehavior: Clip.none,
            isSemanticButton: true,
            onPressed: () => {},
          ),
          Divider(),
          IconButton(
            icon: Icon(
              Icons.access_alarms,
            ),
            focusNode: FocusNode(
                skipTraversal: false,
                canRequestFocus: true,
                descendantsAreFocusable: true,
                descendantsAreTraversable: true),
            autofocus: false,
            constraints: BoxConstraints(
                minWidth: 0.0,
                maxWidth: double.infinity,
                minHeight: 0.0,
                maxHeight: double.infinity),
            onPressed: () => {},
          ),
        ],
        mainAxisAlignment: MainAxisAlignment.start,
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,
        verticalDirection: VerticalDirection.down,
      ),
      floatingActionButton: Icon(
        Icons.access_alarms,
      ),
      persistentFooterAlignment: AlignmentDirectional.centerEnd,
      primary: true,
      drawerDragStartBehavior: DragStartBehavior.start,
      extendBody: false,
      extendBodyBehindAppBar: false,
      drawerEnableOpenDragGesture: true,
      endDrawerEnableOpenDragGesture: true,
    );
  }
}
