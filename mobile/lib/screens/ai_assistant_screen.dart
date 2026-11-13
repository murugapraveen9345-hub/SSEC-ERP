import 'package:flutter/material.dart';

class AiAssistantScreen extends StatefulWidget {
  const AiAssistantScreen({Key? key}) : super(key: key);

  @override
  State<AiAssistantScreen> createState() => _AiAssistantScreenState();
}

class _AiAssistantScreenState extends State<AiAssistantScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, dynamic>> _messages = [
    {
      'role': 'assistant',
      'text': 'Hello Arjun! I am your UniCore AI Campus Tutor. How can I assist you with your courses, exams, or study planning today?'
    },
    {
      'role': 'user',
      'text': 'When is my next Distributed Systems test?'
    },
    {
      'role': 'assistant',
      'text': 'Your Mid-Semester Examination for CS701 (Distributed Systems) is scheduled for this Friday at 10:00 AM in Hall 302. Would you like me to generate a 3-day revision timetable?'
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.auto_awesome, color: Color(0xFF6366F1), size: 20),
            SizedBox(width: 8),
            Text('UniCore AI Tutor'),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['role'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
                    decoration: BoxDecoration(
                      color: isUser
                          ? const Color(0xFF6366F1)
                          : Theme.of(context).cardColor,
                      borderRadius: BorderRadius.circular(16),
                      border: isUser ? null : Border.all(color: Colors.grey.withOpacity(0.15)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.04),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        )
                      ],
                    ),
                    child: Text(
                      msg['text'],
                      style: TextStyle(
                        color: isUser ? Colors.white : Theme.of(context).textTheme.bodyLarge?.color,
                        fontSize: 14,
                        height: 1.4,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Theme.of(context).cardColor,
              border: Border(top: BorderSide(color: Colors.grey.withOpacity(0.15))),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Ask anything about your syllabus, exams...',
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 12),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.mic_none, color: Colors.grey),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: Color(0xFF6366F1)),
                  onPressed: () {
                    if (_controller.text.trim().isNotEmpty) {
                      setState(() {
                        _messages.add({'role': 'user', 'text': _controller.text.trim()});
                        _messages.add({
                          'role': 'assistant',
                          'text': 'Processing your request with UniCore AI Engine...'
                        });
                        _controller.clear();
                      });
                    }
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
