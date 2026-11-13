import 'package:flutter/material.dart';

class StudentHomeScreen extends StatelessWidget {
  const StudentHomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('UniCore Campus', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w400)),
            Text('Arjun Sharma', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Quick Academic KPIs
            Row(
              children: [
                _buildKpiCard(context, 'Attendance', '88.4%', Icons.check_circle_outline, Colors.green),
                const SizedBox(width: 12),
                _buildKpiCard(context, 'CGPA', '8.92', Icons.star_outline, Colors.indigo),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _buildKpiCard(context, 'Next Exam', 'in 3 Days', Icons.event_note, Colors.orange),
                const SizedBox(width: 12),
                _buildKpiCard(context, 'Fee Balance', '₹0.00', Icons.payment, Colors.teal),
              ],
            ),
            const SizedBox(height: 24),

            // Today's Timetable Preview
            const Text(
              "Today's Schedule",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _buildScheduleItem('09:00 AM - 10:00 AM', 'Distributed Systems', 'Hall 302 • Dr. Priya', true),
            _buildScheduleItem('10:15 AM - 11:15 AM', 'Machine Learning Lab', 'Lab 4 • Prof. Rajesh', false),
            _buildScheduleItem('01:30 PM - 02:30 PM', 'Cloud Computing', 'Seminar Hall B', false),
          ],
        ),
      ),
    );
  }

  Widget _buildKpiCard(BuildContext context, String title, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.withOpacity(0.15)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 10,
              offset: const Offset(0, 4),
            )
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 12),
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            Text(title, style: TextStyle(fontSize: 12, color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }

  Widget _buildScheduleItem(String time, String course, String details, bool isOngoing) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isOngoing ? const Color(0xFF6366F1).withOpacity(0.08) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isOngoing ? const Color(0xFF6366F1) : Colors.grey.withOpacity(0.2),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 40,
            decoration: BoxDecoration(
              color: isOngoing ? const Color(0xFF6366F1) : Colors.grey[400],
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(course, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                Text('$time • $details', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
              ],
            ),
          ),
          if (isOngoing)
            const Chip(
              label: Text('NOW', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
              backgroundColor: Color(0xFF6366F1),
              padding: EdgeInsets.zero,
            )
        ],
      ),
    );
  }
}
