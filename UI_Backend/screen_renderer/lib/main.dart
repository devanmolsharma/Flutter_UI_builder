
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
  Widget build(BuildContext context) { return Scaffold(body:Center(child:Text('Hello World!',),),floatingActionButton:FloatingActionButton(child:Icon(Icons.abc_sharp,),mini : false,clipBehavior : Clip.none,focusNode : FocusNode(skipTraversal : false,canRequestFocus : true,descendantsAreFocusable : true,descendantsAreTraversable : true),autofocus : false,isExtended : false,onPressed:()=>{},),persistentFooterAlignment : AlignmentDirectional.centerEnd,primary : true,drawerDragStartBehavior : DragStartBehavior.start,extendBody : false,extendBodyBehindAppBar : false,drawerEnableOpenDragGesture : true,endDrawerEnableOpenDragGesture : true,);
  }
}