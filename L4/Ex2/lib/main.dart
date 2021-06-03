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

class OrientationSwitcher extends StatelessWidget {
  final List<Widget> children;

  const OrientationSwitcher({Key? key, required this.children}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    bool isScreenWide = MediaQuery.of(context).size.width >= 720;
    return isScreenWide ? Column(children: children) : Row(children: children);
  }
}

class MyHomePage extends StatefulWidget {
  // MyHomePage({required Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage>
{
  TextEditingController _laTeXInputController = TextEditingController(
      text: r"$${f(x) = \frac{5}{3} \cdot x}$$");
  late String _laTeX;

  @override
  void initState()
  {
    _renderLaTeX();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("List4"),
      ),
      body: Container(
        child: new OrientationSwitcher(
          children: <Widget>[
            new Expanded (
              flex: 4,
              child : Column(
                children: <Widget>[
                  new Padding(
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
                ],
              ),
            ),
            new Expanded(
              flex: 6,
              child: Column(
                children: <Widget>[
                  new Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Builder(
                      builder: (context) => KaTeX(
                        laTeXCode: Text(_laTeX,
                            style: Theme.of(context).textTheme.bodyText2),
                      ),
                    )
                  ),
                ],
              ),)
          ],
        ),
      )
    );
  }

  void _renderLaTeX() {
    setState(() {
      _laTeX = _laTeXInputController.text;
    });
  }
}
