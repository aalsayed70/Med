
A comprehensive medical prediction platform powered by artificial intelligence, designed to support pregnant women with personalized health insights and predictions throughout their pregnancy journey.

## 🌟 Features

### 🤖 AI-Powered Medical Predictions
- **Labor Type Prediction**: Predict whether delivery will be normal or require a C-section
- **Weight Management**: Track healthy weight gain during pregnancy with personalized recommendations
- **Gestational Diabetes Risk Assessment**: Evaluate the risk of developing gestational diabetes
- **Pregnancy Hypertension Risk**: Assess the likelihood of developing pregnancy-related hypertension

### 🎨 Modern User Interface
- Beautiful, responsive design with Arabic RTL support
- Interactive forms with real-time validation
- Animated results with progress bars and personalized comments
- Mobile-friendly interface optimized for all devices

### 🧠 Advanced AI Integration
- Machine learning models trained on 3.5 million maternal health records
- OpenAI GPT integration for personalized Arabic medical advice
- Real-time risk factor calculations and recommendations

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: Lucide React icons, Framer Motion animations
- **Language Support**: Full Arabic RTL support with Egyptian dialect

### Backend (Flask)
- **Framework**: Flask with CORS support
- **ML Models**: Scikit-learn models for medical predictions
- **AI Integration**: OpenAI GPT-4o-mini for personalized medical advice
- **Data Processing**: Pandas and NumPy for data manipulation

## 📁 Project Structure

```
Med/
├── src/                          # Next.js frontend
│   ├── app/                      # App router pages
│   │   ├── model1/              # Labor prediction page
│   │   ├── model2/              # Weight management page
│   │   ├── model3/              # Gestational diabetes page
│   │   └── model4/              # Hypertension risk page
│   ├── sections/                # Reusable components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Hero.tsx             # Landing page hero section
│   │   ├── Models.tsx           # Model selection interface
│   │   └── Footer.tsx           # Footer component
│   └── assets/                  # Static assets
├── server/                      # Flask backend
│   ├── app/                     # Application modules
│   │   ├── model1.py           # Labor prediction model
│   │   ├── model2.py           # Weight management model
│   │   ├── model3.py           # Gestational diabetes model
│   │   ├── model4.py           # Hypertension risk model
│   │   └── routes.py           # API route definitions
│   ├── *.pkl                   # Trained ML models
│   └── run.py                  # Flask application entry point
└── public/                     # Static files
```


