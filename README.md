# Unique Minds Connect

**Personalized Education and Real-Time Emotion Recognition Platform for Neurodiverse Learners**

## Overview
Unique Minds Connect is a web application designed to support neurodiverse students through personalized educational pathways, gamified learning puzzles, adaptive pacing, sensory tools, and real-time facial emotion recognition.

## Key Features
1. **Adaptive Learning Paths**: Personalized learning goals with customizable pacing (gentle, balanced, accelerated) and learning styles (visual, auditory, hands-on).
2. **Personalized Assessments**: Category-based quizzes (Alphabet, Numbers, Logic, Math) with immediate constructive feedback and reward points.
3. **Gamified Educational Suite**:
   - **Word Unscramble Puzzle**: Vocabulary anagram game with hints and scoring.
   - **3x3 Sliding Jigsaw Puzzle**: Interactive tile puzzle for spatial reasoning.
   - **4x4 Sudoku Grid**: Logic puzzle with validation.
   - **Pattern Logic Challenge**: Sequence completion.
4. **AI Facial Emotion Recognition**:
   - Real-time webcam feed integration (`navigator.mediaDevices.getUserMedia`).
   - Facial expression analysis computing scores across 6 key emotions.
   - Detailed Emotion Reports with dominant emotion confidence, probability breakdown charts (Bar/Pie), and tailored learning recommendations.
5. **Supportive Sensory Tools**:
   - 1-Minute Guided Deep Breathing Session with visual expansion ring.
   - Web Audio API Sound Synthesizer (Rain, White Noise, 528Hz Harmonic Chimes).
   - Sensory Focus Timer.
6. **Quests & Reward Badges**: Interactive gamified reward tracking and level milestones.
7. **Feedback Form**: Community feedback submission with ratings and category tags.

## Setup & Running
```bash
npm install
npm run dev
```
The dev server runs on `http://0.0.0.0:3000`.
