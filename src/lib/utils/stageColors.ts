// src/lib/utils/stageColors.ts
import { stages } from '$lib/data/stages';

export function getStageColor(stageId: string): string {
  const stage = stages.find(s => s.id === stageId.toLowerCase());
  return stage?.hex || '#808080'; // Default gray if stage not found
}

export function getStageTextColor(stageId: string): string {
  // Simple determination of text color based on stage
  // Beige, yellow, and turquoise typically need dark text for contrast
  const darkTextStages = ['beige', 'yellow', 'turquoise'];
  return darkTextStages.includes(stageId.toLowerCase()) ? '#000000' : '#FFFFFF';
}
