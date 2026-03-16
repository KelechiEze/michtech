import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Trophy, 
  GraduationCap, 
  FileText,
  PlayCircle,
  Minus,
  LucideIcon,
  Volume2,
  X
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface TakeQuizProps {
  course: any;
  onBack: () => void;
}

const getQuestionsForCourse = (courseId: number): Question[] => {
  switch (courseId) {
    case 1: // Fun with Numbers
      return [
        { id: 1, text: 'What is 1 + 1?', options: ['1', '2', '3', '4'], correctAnswer: 1 },
        { id: 2, text: 'What number comes after 5?', options: ['4', '6', '7', '8'], correctAnswer: 1 },
        { id: 3, text: 'How many fingers do you have on one hand?', options: ['3', '4', '5', '6'], correctAnswer: 2 },
        { id: 4, text: 'What is 10 - 2?', options: ['7', '8', '9', '6'], correctAnswer: 1 },
        { id: 5, text: 'Which is bigger: 7 or 3?', options: ['7', '3', 'They are same', 'None'], correctAnswer: 0 },
        { id: 6, text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
        { id: 7, text: 'What is 0 + 5?', options: ['0', '5', '10', '1'], correctAnswer: 1 },
        { id: 8, text: 'How many legs does a dog have?', options: ['2', '3', '4', '5'], correctAnswer: 2 },
        { id: 9, text: 'What is 3 + 3?', options: ['5', '6', '7', '8'], correctAnswer: 1 },
        { id: 10, text: 'What is 5 - 1?', options: ['3', '4', '5', '6'], correctAnswer: 1 },
        { id: 11, text: 'Count the stars: * * *', options: ['1', '2', '3', '4'], correctAnswer: 2 },
        { id: 12, text: 'What is 4 + 1?', options: ['4', '5', '6', '3'], correctAnswer: 1 },
        { id: 13, text: 'What is 8 - 4?', options: ['2', '3', '4', '5'], correctAnswer: 2 },
        { id: 14, text: 'Which number is smallest?', options: ['10', '5', '2', '8'], correctAnswer: 2 },
        { id: 15, text: 'What is 6 + 0?', options: ['0', '6', '12', '1'], correctAnswer: 1 },
      ];
    case 2: // Magic of Science
      return [
        { id: 1, text: 'What do plants need to grow?', options: ['Candy', 'Water and Sunlight', 'Toys', 'Milk'], correctAnswer: 1 },
        { id: 2, text: 'Which animal lives in the ocean?', options: ['Lion', 'Elephant', 'Whale', 'Monkey'], correctAnswer: 2 },
        { id: 3, text: 'What color is the sky on a sunny day?', options: ['Green', 'Red', 'Blue', 'Yellow'], correctAnswer: 2 },
        { id: 4, text: 'What do we use to see things?', options: ['Ears', 'Nose', 'Eyes', 'Hands'], correctAnswer: 2 },
        { id: 5, text: 'Which is a fruit?', options: ['Carrot', 'Apple', 'Potato', 'Broccoli'], correctAnswer: 1 },
        { id: 6, text: 'What do bees make?', options: ['Milk', 'Honey', 'Juice', 'Water'], correctAnswer: 1 },
        { id: 7, text: 'Which animal can fly?', options: ['Dog', 'Cat', 'Bird', 'Fish'], correctAnswer: 2 },
        { id: 8, text: 'What is the sun?', options: ['A planet', 'A star', 'The moon', 'A cloud'], correctAnswer: 1 },
        { id: 9, text: 'What happens to water when it freezes?', options: ['It turns to steam', 'It turns to ice', 'It disappears', 'It turns red'], correctAnswer: 1 },
        { id: 10, text: 'How many legs does a spider have?', options: ['4', '6', '8', '10'], correctAnswer: 2 },
        { id: 11, text: 'Which sense do we use to hear music?', options: ['Sight', 'Smell', 'Hearing', 'Touch'], correctAnswer: 2 },
        { id: 12, text: 'What do we call a baby frog?', options: ['Puppy', 'Kitten', 'Tadpole', 'Chick'], correctAnswer: 2 },
        { id: 13, text: 'Which is NOT a season?', options: ['Summer', 'Winter', 'Monday', 'Spring'], correctAnswer: 2 },
        { id: 14, text: 'What part of the plant is under the ground?', options: ['Leaves', 'Flowers', 'Roots', 'Stem'], correctAnswer: 2 },
        { id: 15, text: 'What do we breathe?', options: ['Water', 'Air', 'Food', 'Sand'], correctAnswer: 1 },
      ];
    case 3: // Story Time: English
      return [
        { id: 1, text: 'What is the first letter of the alphabet?', options: ['B', 'C', 'A', 'Z'], correctAnswer: 2 },
        { id: 2, text: 'Which word rhymes with "Cat"?', options: ['Dog', 'Hat', 'Sun', 'Boy'], correctAnswer: 1 },
        { id: 3, text: 'How many vowels are there?', options: ['3', '5', '10', '26'], correctAnswer: 1 },
        { id: 4, text: 'What is the opposite of "Big"?', options: ['Large', 'Huge', 'Small', 'Tall'], correctAnswer: 2 },
        { id: 5, text: 'Which is a naming word (Noun)?', options: ['Run', 'Apple', 'Fast', 'Jump'], correctAnswer: 1 },
        { id: 6, text: 'What do we use at the end of a sentence?', options: ['Comma', 'Full stop', 'Space', 'Letter'], correctAnswer: 1 },
        { id: 7, text: 'Which word starts with "S"?', options: ['Apple', 'Ball', 'Sun', 'Dog'], correctAnswer: 2 },
        { id: 8, text: 'What is the plural of "Dog"?', options: ['Doges', 'Dogs', 'Doggi', 'Doggies'], correctAnswer: 1 },
        { id: 9, text: 'Which is a color word?', options: ['Happy', 'Red', 'Run', 'Book'], correctAnswer: 1 },
        { id: 10, text: 'What sound does a cow make?', options: ['Meow', 'Woof', 'Moo', 'Quack'], correctAnswer: 2 },
        { id: 11, text: 'Which word is spelled correctly?', options: ['Skool', 'School', 'Schoole', 'Skul'], correctAnswer: 1 },
        { id: 12, text: 'What is a storybook?', options: ['A toy', 'A book with stories', 'A snack', 'A bed'], correctAnswer: 1 },
        { id: 13, text: 'Which is an action word (Verb)?', options: ['Table', 'Jump', 'Green', 'Bird'], correctAnswer: 1 },
        { id: 14, text: 'What letter comes after "M"?', options: ['L', 'N', 'O', 'P'], correctAnswer: 1 },
        { id: 15, text: 'Who writes a book?', options: ['Doctor', 'Author', 'Baker', 'Pilot'], correctAnswer: 1 },
      ];
    case 4: // Art & Colors
      return [
        { id: 1, text: 'What color do you get by mixing Red and Yellow?', options: ['Green', 'Orange', 'Purple', 'Blue'], correctAnswer: 1 },
        { id: 2, text: 'Which is a primary color?', options: ['Green', 'Purple', 'Blue', 'Orange'], correctAnswer: 2 },
        { id: 3, text: 'What do we use to paint?', options: ['Spoon', 'Brush', 'Fork', 'Hammer'], correctAnswer: 1 },
        { id: 4, text: 'Which shape has 3 sides?', options: ['Square', 'Circle', 'Triangle', 'Rectangle'], correctAnswer: 2 },
        { id: 5, text: 'What color is a banana?', options: ['Red', 'Blue', 'Yellow', 'Green'], correctAnswer: 2 },
        { id: 6, text: 'Which is a cold color?', options: ['Red', 'Orange', 'Blue', 'Yellow'], correctAnswer: 2 },
        { id: 7, text: 'What do you use to draw a straight line?', options: ['Eraser', 'Ruler', 'Glue', 'Scissors'], correctAnswer: 1 },
        { id: 8, text: 'Which shape is round?', options: ['Square', 'Triangle', 'Circle', 'Star'], correctAnswer: 2 },
        { id: 9, text: 'What color is grass?', options: ['Purple', 'Green', 'Pink', 'Brown'], correctAnswer: 1 },
        { id: 10, text: 'What do we use to stick paper together?', options: ['Water', 'Glue', 'Paint', 'Sand'], correctAnswer: 1 },
        { id: 11, text: 'Which is a warm color?', options: ['Blue', 'Green', 'Red', 'Purple'], correctAnswer: 2 },
        { id: 12, text: 'What do we call a person who makes art?', options: ['Chef', 'Artist', 'Driver', 'Nurse'], correctAnswer: 1 },
        { id: 13, text: 'Which color is made from Blue and Red?', options: ['Green', 'Orange', 'Purple', 'Yellow'], correctAnswer: 2 },
        { id: 14, text: 'What do we use to erase pencil marks?', options: ['Pen', 'Eraser', 'Paper', 'Brush'], correctAnswer: 1 },
        { id: 15, text: 'How many colors are in a rainbow?', options: ['3', '5', '7', '10'], correctAnswer: 2 },
      ];
    case 5: // Musical Adventure
      return [
        { id: 1, text: 'Which instrument do you hit with sticks?', options: ['Piano', 'Flute', 'Drums', 'Guitar'], correctAnswer: 2 },
        { id: 2, text: 'What is a group of people singing together called?', options: ['Team', 'Choir', 'Class', 'Club'], correctAnswer: 1 },
        { id: 3, text: 'Which instrument has strings?', options: ['Trumpet', 'Guitar', 'Drum', 'Whistle'], correctAnswer: 1 },
        { id: 4, text: 'What do we call the speed of music?', options: ['Color', 'Tempo', 'Weight', 'Height'], correctAnswer: 1 },
        { id: 5, text: 'Which is a loud sound?', options: ['Whisper', 'Thunder', 'Tiptoe', 'Leaf falling'], correctAnswer: 1 },
        { id: 6, text: 'What do we use to play a piano?', options: ['Feet', 'Fingers', 'Elbows', 'Nose'], correctAnswer: 1 },
        { id: 7, text: 'Which animal is known for singing?', options: ['Dog', 'Bird', 'Snake', 'Fish'], correctAnswer: 1 },
        { id: 8, text: 'What is a "melody"?', options: ['A snack', 'A tune', 'A color', 'A toy'], correctAnswer: 1 },
        { id: 9, text: 'Which instrument do you blow into?', options: ['Drum', 'Flute', 'Piano', 'Guitar'], correctAnswer: 1 },
        { id: 10, text: 'What is a "lullaby"?', options: ['A fast song', 'A song to help babies sleep', 'A loud song', 'A dance'], correctAnswer: 1 },
        { id: 11, text: 'How do we feel when we hear happy music?', options: ['Sad', 'Happy', 'Angry', 'Sleepy'], correctAnswer: 1 },
        { id: 12, text: 'Which part of our body do we use to sing?', options: ['Hands', 'Voice', 'Feet', 'Ears'], correctAnswer: 1 },
        { id: 13, text: 'What is a "beat"?', options: ['A vegetable', 'A steady pulse in music', 'A type of shoe', 'A book'], correctAnswer: 1 },
        { id: 14, text: 'Which instrument is very large and has many black and white keys?', options: ['Violin', 'Piano', 'Recorder', 'Triangle'], correctAnswer: 1 },
        { id: 15, text: 'What do we call a person who leads an orchestra?', options: ['Driver', 'Conductor', 'Pilot', 'Chef'], correctAnswer: 1 },
      ];
    case 6: // Healthy Habits
      return [
        { id: 1, text: 'How many times a day should you brush your teeth?', options: ['Once', 'Twice', 'Never', 'Ten times'], correctAnswer: 1 },
        { id: 2, text: 'Which is a healthy snack?', options: ['Candy', 'Apple', 'Chips', 'Soda'], correctAnswer: 1 },
        { id: 3, text: 'What should you do before eating?', options: ['Run', 'Wash your hands', 'Sleep', 'Sing'], correctAnswer: 1 },
        { id: 4, text: 'Why is sleep important?', options: ['To be tired', 'To help our body grow and rest', 'To miss school', 'To see dreams'], correctAnswer: 1 },
        { id: 5, text: 'Which drink is best for your body?', options: ['Soda', 'Water', 'Coffee', 'Tea'], correctAnswer: 1 },
        { id: 6, text: 'What should you wear when riding a bike?', options: ['Hat', 'Helmet', 'Scarf', 'Gloves'], correctAnswer: 1 },
        { id: 7, text: 'Which is an exercise?', options: ['Watching TV', 'Running', 'Sitting', 'Sleeping'], correctAnswer: 1 },
        { id: 8, text: 'What do we use to keep our hair clean?', options: ['Soap', 'Shampoo', 'Toothpaste', 'Glue'], correctAnswer: 1 },
        { id: 9, text: 'Which food gives us strong bones?', options: ['Candy', 'Milk', 'Cake', 'Pizza'], correctAnswer: 1 },
        { id: 10, text: 'What should you do if you cough?', options: ['Laugh', 'Cover your mouth', 'Shout', 'Run'], correctAnswer: 1 },
        { id: 11, text: 'Which is a vegetable?', options: ['Chocolate', 'Broccoli', 'Cookie', 'Ice cream'], correctAnswer: 1 },
        { id: 12, text: 'How do you feel when you drink enough water?', options: ['Thirsty', 'Energetic', 'Sleepy', 'Sad'], correctAnswer: 1 },
        { id: 13, text: 'Why do we wash our bodies?', options: ['To get wet', 'To stay clean and healthy', 'To play with bubbles', 'To waste time'], correctAnswer: 1 },
        { id: 14, text: 'Which activity is good for your heart?', options: ['Sitting still', 'Playing outside', 'Napping', 'Eating candy'], correctAnswer: 1 },
        { id: 15, text: 'What do we use to clean our teeth?', options: ['Hairbrush', 'Toothbrush', 'Paintbrush', 'Spoon'], correctAnswer: 1 },
      ];
    default:
      return [];
  }
};

export default function TakeQuiz({ course, onBack }: TakeQuizProps) {
  const { theme } = useTheme();
  const questions = getQuestionsForCourse(course?.id || 1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
        return;
      }

      window.speechSynthesis.cancel();
      const question = questions[currentQuestion];
      const text = `${question.text}. Option 1: ${question.options[0]}. Option 2: ${question.options[1]}. Option 3: ${question.options[2]}. Option 4: ${question.options[3]}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseSpeaking = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-10 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className={`w-12 h-12 border rounded-2xl flex items-center justify-center transition-all shadow-xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-400'
                : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600'
            }`}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div>
            <h1 className={`text-3xl font-black tracking-tighter mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Take Quiz</h1>
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-blue-600 rounded-full" />
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
              }`}>
                Course: <span className="text-blue-500">{course?.title || 'Basics of HTML'}</span>
              </p>
            </div>
          </div>
        </div>
        {!isFinished && (
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={isSpeaking ? pauseSpeaking : speakQuestion}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all shadow-xl border ${
                isSpeaking || isPaused 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-blue-400 hover:bg-white/10'
                    : 'bg-white border-gray-200 text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Volume2 size={18} className={isSpeaking ? 'animate-bounce' : ''} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {isSpeaking ? 'Pause' : isPaused ? 'Resume' : 'Listen'}
              </span>
            </motion.button>
            {(isSpeaking || isPaused) && (
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setIsPaused(false);
                }}
                className={`w-10 h-10 border rounded-xl flex items-center justify-center transition-all ${
                  theme === 'dark'
                    ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20'
                    : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'
                }`}
                title="Stop Narrator"
              >
                <X size={18} />
              </motion.button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`backdrop-blur-xl border overflow-hidden shadow-2xl relative ${
              theme === 'dark'
                ? 'bg-[#1a1d23]/40 border-white/5'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${
              theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
            }`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
              />
            </div>

            <div className="p-12">
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Progress
                  </span>
                  <span className={`text-2xl font-black tracking-tighter ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentQuestion + 1} <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} text-lg`}>/ {questions.length}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  {questions.map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={false}
                      animate={{ 
                        width: i === currentQuestion ? 32 : 12,
                        backgroundColor: i === currentQuestion ? '#2563eb' : i < currentQuestion ? '#10b981' : theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                      }}
                      className="h-2 transition-all duration-500"
                    />
                  ))}
                </div>
              </div>

              <motion.h2 
                key={currentQuestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-3xl font-bold mb-12 leading-tight tracking-tight ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                {questions[currentQuestion].text}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={theme === 'dark' ? { scale: 1.02, y: -4 } : {}}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOption(index)}
                    className={`text-left p-8 border-2 transition-all flex items-center gap-6 relative overflow-hidden group ${
                      selectedOption === index 
                        ? theme === 'dark'
                          ? 'border-blue-600 bg-blue-600/10 shadow-[0_20px_40px_rgba(37,99,235,0.15)]' 
                          : 'border-blue-600 bg-blue-50 shadow-[0_20px_40px_rgba(37,99,235,0.1)]'
                        : theme === 'dark'
                          ? 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10'
                          : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      selectedOption === index 
                        ? 'border-blue-600 bg-blue-600 rotate-0' 
                        : theme === 'dark'
                          ? 'border-white/10 bg-white/5 rotate-45 group-hover:rotate-0'
                          : 'border-gray-200 bg-white rotate-45 group-hover:rotate-0'
                    }`}>
                      {selectedOption === index ? (
                        <CheckCircle2 size={20} className="text-white" />
                      ) : (
                        <span className={`text-xs font-black ${
                          theme === 'dark' ? 'text-gray-600 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'
                        }`}>{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-lg font-bold transition-colors ${
                      selectedOption === index 
                        ? 'text-white' 
                        : theme === 'dark'
                          ? 'text-gray-400 group-hover:text-gray-200'
                          : 'text-gray-600 group-hover:text-gray-900'
                    }`}>
                      {option}
                    </span>
                    
                    {selectedOption === index && (
                      <motion.div 
                        layoutId="active-option"
                        className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent pointer-events-none"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className={`p-10 border-t ${
              theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            } flex justify-end`}>
              <motion.button
                whileHover={selectedOption !== null ? { scale: 1.05, y: -2 } : {}}
                whileTap={selectedOption !== null ? { scale: 0.95 } : {}}
                disabled={selectedOption === null}
                onClick={handleNext}
                className={`flex items-center gap-4 px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl ${
                  selectedOption === null 
                    ? theme === 'dark'
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)]'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            className={`backdrop-blur-2xl border overflow-hidden p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative ${
              theme === 'dark' ? 'bg-[#1a1d23]/60 border-white/10' : 'bg-white border-gray-200'
            }`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mt-48" />
            
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
              className="w-32 h-32 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-[0_20px_50px_rgba(234,179,8,0.3)] relative z-10"
            >
              <Trophy size={64} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10"
            >
              <h2 className={`text-5xl font-black mb-4 tracking-tighter ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Quiz Completed!</h2>
              <p className={`mb-12 font-medium text-lg ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
              }`}>Incredible performance! You've mastered this lesson.</p>
              
              <div className="flex justify-center gap-16 mb-16">
                <div className="flex flex-col items-center">
                  <div className={`text-5xl font-black tracking-tighter mb-2 flex items-baseline gap-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {score} <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} text-2xl`}>/ {questions.length}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Correct Answers</span>
                </div>
                <div className={`w-px h-16 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-black text-blue-500 tracking-tighter mb-2">
                    {Math.round((score/questions.length)*100)}%
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Final Grade</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                  className={`border px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Retake Quiz
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBack}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all shadow-2xl"
                >
                  Back to Course
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
