import 'package:flutter/material.dart';

class DigitalIdScreen extends StatefulWidget {
  const DigitalIdScreen({Key? key}) : super(key: key);

  @override
  State<DigitalIdScreen> createState() => _DigitalIdScreenState();
}

class _DigitalIdScreenState extends State<DigitalIdScreen> {
  bool _isFlipped = false;
  int _refreshSeconds = 28;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Campus Digital ID'),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Virtual ID Card
              GestureDetector(
                onTap: () => setState(() => _isFlipped = !_isFlipped),
                child: Container(
                  width: double.infinity,
                  height: 220,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF2E0854), Color(0xFF6366F1)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF6366F1).withOpacity(0.35),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      )
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'UNICORE UNIVERSITY',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, letterSpacing: 1.2),
                          ),
                          Icon(Icons.nfc, color: Colors.white70),
                        ],
                      ),
                      Row(
                        children: [
                          Container(
                            width: 60,
                            height: 60,
                            decoration: BoxDecoration(
                              color: Colors.white24,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: Colors.white54),
                            ),
                            child: const Icon(Icons.person, color: Colors.white, size: 36),
                          ),
                          const SizedBox(width: 16),
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Arjun Sharma',
                                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                              ),
                              Text(
                                'CS22B042 • B.Tech CSE',
                                style: TextStyle(color: Colors.white70, fontSize: 12),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('VALID THRU: 06/2026', style: TextStyle(color: Colors.white60, fontSize: 11)),
                          Text('TAP TO FLIP ↺', style: TextStyle(color: Colors.white70, fontSize: 11)),
                        ],
                      )
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 30),

              // Dynamic QR
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Theme.of(context).cardColor,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.withOpacity(0.15)),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.qr_code_2, color: Color(0xFF6366F1)),
                        const SizedBox(width: 8),
                        Text(
                          'Anti-Screenshot Token (${_refreshSeconds}s)',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Container(
                      width: 140,
                      height: 140,
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Center(
                        child: Icon(Icons.qr_code, size: 100, color: Colors.black87),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Scan at Campus Turnstiles & Dining Halls',
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
