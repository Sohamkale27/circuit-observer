import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation & General
      "welcome_back": "Welcome back",
      "ready_to_learn": "Ready to continue your learning journey?",
      "search_courses": "Search courses...",
      "my_courses": "My Courses",
      "continue_journey": "Continue your learning journey",
      "loading_courses": "Loading your courses...",
      
      // Course related
      "beginner": "Beginner", 
      "intermediate": "Intermediate",
      "advanced": "Advanced",
      "progress": "Progress",
      "lessons": "lessons",
      "minutes": "minutes",
      "points": "points",
      "start": "Start",
      "continue": "Continue", 
      "review": "Review",
      "locked": "Locked",
      
      // Categories
      "math": "Math",
      "science": "Science", 
      "language": "Language",
      "social": "Social Studies",
      "arts": "Arts",
      "technology": "Technology",
      
      // Stats & Achievements
      "level": "Level",
      "day_streak": "day streak",
      "courses_done": "Courses done",
      "learning_stats": "Learning Stats",
      "minutes_today": "Minutes today",
      "this_week": "This week",
      "completion_rate": "Completion Rate",
      "strongest": "Strongest",
      "focus_on": "Focus on",
      "achievements": "Achievements",
      "no_achievements": "No achievements yet. Keep learning!",
      
      // Games
      "math_game": "Math Challenge",
      "science_lab": "Science Lab",
      "word_builder": "Word Builder",
      "play_game": "Play Game",
      "high_score": "High Score",
      
      // Offline
      "offline_mode": "Offline Mode",
      "data_synced": "Data will sync when online"
    }
  },
  hi: {
    translation: {
      // Navigation & General  
      "welcome_back": "वापसी पर स्वागत है",
      "ready_to_learn": "अपनी शिक्षा यात्रा जारी रखने के लिए तैयार हैं?",
      "search_courses": "कोर्स खोजें...",
      "my_courses": "मेरे कोर्स",
      "continue_journey": "अपनी शिक्षा यात्रा जारी रखें",
      "loading_courses": "आपके कोर्स लोड हो रहे हैं...",
      
      // Course related
      "beginner": "शुरुआती",
      "intermediate": "मध्यम", 
      "advanced": "उन्नत",
      "progress": "प्रगति",
      "lessons": "पाठ",
      "minutes": "मिनट",
      "points": "अंक",
      "start": "शुरू करें",
      "continue": "जारी रखें",
      "review": "समीक्षा",
      "locked": "बंद",
      
      // Categories
      "math": "गणित",
      "science": "विज्ञान",
      "language": "भाषा", 
      "social": "सामाजिक अध्ययन",
      "arts": "कला",
      "technology": "तकनीक",
      
      // Stats & Achievements
      "level": "स्तर", 
      "day_streak": "दिन की लकीर",
      "courses_done": "पूर्ण कोर्स",
      "learning_stats": "शिक्षा आंकड़े",
      "minutes_today": "आज के मिनट",
      "this_week": "इस सप्ताह",
      "completion_rate": "पूर्णता दर",
      "strongest": "सबसे मजबूत",
      "focus_on": "ध्यान दें",
      "achievements": "उपलब्धियां",
      "no_achievements": "अभी तक कोई उपलब्धि नहीं। सीखते रहें!",
      
      // Games
      "math_game": "गणित चुनौती",
      "science_lab": "विज्ञान प्रयोगशाला", 
      "word_builder": "शब्द निर्माता",
      "play_game": "खेल खेलें",
      "high_score": "उच्च स्कोर",
      
      // Offline
      "offline_mode": "ऑफ़लाइन मोड",
      "data_synced": "ऑनलाइन होने पर डेटा सिंक होगा"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false
    },
    
    // Store language preference
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;