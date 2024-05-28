import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App',
      home: MyHomePage(title: 'Anmols'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  
  final String title;
  
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Color _backgroundColor = Colors.white;
  
  void _changeBackgroundColor() {
    setState(() {
      Random random = Random();
      _backgroundColor = Color.fromRGBO(
        random.nextInt(256),
        random.nextInt(256),
        random.nextInt(256),
        1,
      );
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _backgroundColor,
      body: const Text('Lol'),
      floatingActionButton: FloatingActionButton.extended(
        label: const Text('Lol2'),
        onPressed: _changeBackgroundColor,
      ),
    );
  }
}