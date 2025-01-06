// types/spiral.ts

export type SpiralStage =
  | 'beige'
  | 'purple'
  | 'red'
  | 'blue'
  | 'orange'
  | 'green'
  | 'yellow'
  | 'turquoise'
  | 'coral';

export type Language = 'en' | 'sv';

export type Translation = Record<Language, string>;

export interface QuestionOption {
  text: Translation;
  value: number;
  relatedStages: SpiralStage[];
}

export interface Question {
  id: string;
  text: Translation;
  type: 'likert' | 'multiple-choice' | 'slider';
  options: QuestionOption[];
  explanation?: Translation;
  tags?: string[];
  category?: 'values' | 'worldview' | 'decision-making' | 'relationships' | 'society' | 'purpose';
}

export interface StageInfo {
  name: Translation;
  color: string;
  description: Translation;
  characteristics: Translation[];
  challenges: Translation[];
  growthPaths: Translation[];
}

export interface SpiralResult {
  dominantStage: SpiralStage;
  stageScores: Record<SpiralStage, number>;
  timestamp: number;
}
