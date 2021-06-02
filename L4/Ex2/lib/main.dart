import 'package:flutter/material.dart';
// ignore: import_of_legacy_library_into_null_safe
import 'package:katex_flutter/katex_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter KaTeX Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  // MyHomePage({required Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  TextEditingController _laTeXInputController = TextEditingController(
      text: r"$${\rm{A function: } f(x) = \frac{5}{3} \cdot x}$$");
  late String _laTeX;

  @override
  void initState() {
    _renderLaTeX();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("List4"),
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Center(
            child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    onChanged: (text)
                    {
                      print("First text field: $text");
                      _renderLaTeX();
                    },
                    keyboardType: TextInputType.multiline,
                    maxLines: null,
                    decoration: InputDecoration(
                        hintText: "Enter term",
                    ),
                    controller: _laTeXInputController,
                  ),
                ),
                Container(
                    child: Builder(
                      builder: (context) => KaTeX(
                        laTeXCode: Text(_laTeX,
                            style: Theme.of(context).textTheme.bodyText2),
                      ),
                    ))
              ],
            ),
          ),
        ),
    );
  }

  void _renderLaTeX() {
    setState(() {
      _laTeX = _laTeXInputController.text;
    });
  }
}
