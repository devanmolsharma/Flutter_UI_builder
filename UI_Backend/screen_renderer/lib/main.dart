import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'dart:ui';
import 'dart:math';

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
  int number = 0;
  Color bodyColor = Colors.white;

  void increaseNumber() {
    setState(() {
      number += 4;
      bodyColor = randomColor();
    });
  }

  Color randomColor() {
    Random random = Random();
    return Color.fromARGB(
      255,
      random.nextInt(256),
      random.nextInt(256),
      random.nextInt(256),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('Number => $number',),),
      floatingActionButton: IconButton(
        icon: Icon(Icons.abc),
        onPressed: increaseNumber,
      ),
      backgroundColor: bodyColor,
    );
  }
}