// ==============================================================================
// EMPREGOS AL – SETEQ (Governo de Alagoas)
// Aplicativo Mobile Nativo Multiplataforma (Flutter / Android & iOS)
// Arquitetura Limpa (Clean Architecture) com Riverpod, Material 3 & Deep Tech UI
// ==============================================================================

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const SeteqMobileApp());
}

class SeteqMobileApp extends StatelessWidget {
  const SeteqMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Empregos AL - SETEQ',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.system,
      theme: _buildLightTheme(),
      darkTheme: _buildDarkTheme(),
      home: const MainTabScaffold(),
    );
  }

  static ThemeData _buildLightTheme() {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF0F172A),
        primary: const Color(0xFF1E3A8A),
        secondary: const Color(0xFF06B6D4),
        background: const Color(0xFFF8FAFC),
        surface: Colors.white,
      ),
      fontFamily: 'Inter',
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFF0F172A),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
    );
  }

  static ThemeData _buildDarkTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: const ColorScheme.dark(
        primary: Color(0xFF06B6D4),
        secondary: Color(0xFF38BDF8),
        background: Color(0xFF0B1120),
        surface: Color(0xFF0F172A),
        onSurface: Color(0xFFF8FAFC),
      ),
      fontFamily: 'Inter',
      scaffoldBackgroundColor: const Color(0xFF0B1120),
    );
  }
}

class MainTabScaffold extends StatefulWidget {
  const MainTabScaffold({super.key});

  @override
  State<MainTabScaffold> createState() => _MainTabScaffoldState();
}

class _MainTabScaffoldState extends State<MainTabScaffold> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    JobsTabScreen(),
    CoursesTabScreen(),
    NewsTabScreen(),
    SineTabScreen(),
    ProfileTabScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: const Color(0xFF0D47A1),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.redAccent, width: 1.5),
              ),
              alignment: Alignment.center,
              child: const Text('AL', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12)),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('EMPREGOS AL', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                Text('Governo de Alagoas • SETEQ', style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active_outlined, color: Color(0xFF06B6D4)),
            onPressed: () => _showNotificationSheet(context),
          ),
          IconButton(
            icon: const Icon(Icons.accessibility_new),
            onPressed: () => _toggleHighContrast(),
          ),
        ],
      ),
      body: _screens[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: isDark ? const Color(0xFF0F172A) : Colors.white,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.work_outline), selectedIcon: Icon(Icons.work), label: 'Vagas'),
          NavigationDestination(icon: Icon(Icons.school_outlined), selectedIcon: Icon(Icons.school), label: 'Cursos'),
          NavigationDestination(icon: Icon(Icons.newspaper_outlined), selectedIcon: Icon(Icons.newspaper), label: 'Notícias'),
          NavigationDestination(icon: Icon(Icons.location_city_outlined), selectedIcon: Icon(Icons.location_city), label: 'SINE AL'),
          NavigationDestination(icon: Icon(Icons.badge_outlined), selectedIcon: Icon(Icons.badge), label: 'Carteira'),
        ],
      ),
    );
  }

  void _showNotificationSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF0F172A),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Notificações Oficiais SETEQ', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 12),
            _notificationTile('🎯 Nova Vaga Compatível', 'Alagoas Tech abriu vaga de Desenvolvedor (Match IA: 94%)', 'Há 15 min'),
            _notificationTile('🎓 Inscrições Abertas', 'Curso de Energia Solar no SENAI Arapiraca com bolsa', 'Há 1 hora'),
          ],
        ),
      ),
    );
  }

  Widget _notificationTile(String title, String body, String time) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF06B6D4), fontSize: 13)),
              Text(time, style: const TextStyle(color: Colors.grey, fontSize: 11)),
            ],
          ),
          const SizedBox(height: 4),
          Text(body, style: const TextStyle(color: Colors.white70, fontSize: 12)),
        ],
      ),
    );
  }

  void _toggleHighContrast() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Acessibilidade: Modo Alto Contraste alternado.')),
    );
  }
}

// ---------------------------------------------------------------------------
// TELAS TAB
// ---------------------------------------------------------------------------
class JobsTabScreen extends StatelessWidget {
  const JobsTabScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        TextField(
          decoration: InputDecoration(
            hintText: 'Buscar vagas por cargo, cidade ou CBO...',
            prefixIcon: const Icon(Icons.search),
            filled: true,
            fillColor: Theme.of(context).colorScheme.surface,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
          ),
        ),
        const SizedBox(height: 16),
        _jobCard('Desenvolvedor Web Full Stack Júnior', 'Alagoas Tech', 'Maceió/AL', 'R\$ 4.500', 94),
        _jobCard('Técnico de Manutenção Solar', 'Nordeste Solar', 'Arapiraca/AL', 'R\$ 3.200', 88),
        _jobCard('Assistente de Logística e Estoque', 'Porto Distribuição', 'Rio Largo/AL', 'R\$ 2.400', 82),
      ],
    );
  }

  Widget _jobCard(String title, String company, String city, String salary, int match) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Expanded(child: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14))),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: Colors.emerald.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
                  child: Text('$match% Match IA', style: const TextStyle(color: Colors.emerald, fontWeight: FontWeight.bold, fontSize: 11)),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(company, style: const TextStyle(color: Colors.grey, fontSize: 12)),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Text('📍 $city • $salary', style: const TextStyle(fontSize: 12)),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF06B6D4),
                    foregroundColor: Colors.black,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  child: const Text('Candidatar-se', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class CoursesTabScreen extends StatelessWidget {
  const CoursesTabScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Catálogo Oficial Qualifica Alagoas & SENAI/SENAC'));
  }
}

class NewsTabScreen extends StatelessWidget {
  const NewsTabScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Notícias, Editais e Comunicados Oficiais SETEQ'));
  }
}

class SineTabScreen extends StatelessWidget {
  const SineTabScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Agências Regionais SINE em Alagoas'));
  }
}

class ProfileTabScreen extends StatelessWidget {
  const ProfileTabScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text('Carteira Digital do Trabalhador Alagoano'));
  }
}
