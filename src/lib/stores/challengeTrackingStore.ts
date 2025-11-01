// Challenge tracking system for Spiralize
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type ChallengeStatus = 'not-started' | 'started' | 'in-progress' | 'completed';

export interface ChallengeProgress {
  challengeId: string;
  status: ChallengeStatus;
  startedAt?: string;
  completedAt?: string;
  reflectionNotes?: string;
  lastUpdated: string;
}

export interface ChallengeTracking {
  progress: Record<string, ChallengeProgress>;
  completionsByTransition: Record<string, number>;
}

const STORAGE_KEY = 'spiralize_challenge_tracking';

// Initialize from localStorage
function loadTracking(): ChallengeTracking {
  if (!browser) {
    return { progress: {}, completionsByTransition: {} };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading challenge tracking:', error);
  }

  return { progress: {}, completionsByTransition: {} };
}

// Create the store
function createChallengeTrackingStore() {
  const { subscribe, set, update } = writable<ChallengeTracking>(loadTracking());

  // Save to localStorage whenever the store updates
  function saveToStorage(tracking: ChallengeTracking) {
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
      } catch (error) {
        console.error('Error saving challenge tracking:', error);
      }
    }
  }

  return {
    subscribe,
    
    // Start a challenge
    startChallenge: (challengeId: string, transition: string) => {
      update(tracking => {
        const now = new Date().toISOString();
        tracking.progress[challengeId] = {
          challengeId,
          status: 'started',
          startedAt: now,
          lastUpdated: now
        };
        saveToStorage(tracking);
        return tracking;
      });
    },

    // Mark challenge as in progress (optional intermediate state)
    markInProgress: (challengeId: string) => {
      update(tracking => {
        if (tracking.progress[challengeId]) {
          tracking.progress[challengeId].status = 'in-progress';
          tracking.progress[challengeId].lastUpdated = new Date().toISOString();
        }
        saveToStorage(tracking);
        return tracking;
      });
    },

    // Complete a challenge
    completeChallenge: (challengeId: string, transition: string, reflectionNotes?: string) => {
      update(tracking => {
        const now = new Date().toISOString();
        const existing = tracking.progress[challengeId];
        
        tracking.progress[challengeId] = {
          ...existing,
          challengeId,
          status: 'completed',
          completedAt: now,
          reflectionNotes: reflectionNotes || existing?.reflectionNotes,
          lastUpdated: now,
          startedAt: existing?.startedAt || now
        };

        // Update completion count for this transition
        tracking.completionsByTransition[transition] = 
          (tracking.completionsByTransition[transition] || 0) + 1;

        saveToStorage(tracking);
        return tracking;
      });
    },

    // Update reflection notes without changing status
    updateReflection: (challengeId: string, reflectionNotes: string) => {
      update(tracking => {
        if (tracking.progress[challengeId]) {
          tracking.progress[challengeId].reflectionNotes = reflectionNotes;
          tracking.progress[challengeId].lastUpdated = new Date().toISOString();
        }
        saveToStorage(tracking);
        return tracking;
      });
    },

    // Reset a challenge (mark as not started)
    resetChallenge: (challengeId: string, transition: string) => {
      update(tracking => {
        const wasCompleted = tracking.progress[challengeId]?.status === 'completed';
        
        delete tracking.progress[challengeId];
        
        // Decrement completion count if it was completed
        if (wasCompleted && tracking.completionsByTransition[transition] > 0) {
          tracking.completionsByTransition[transition]--;
        }
        
        saveToStorage(tracking);
        return tracking;
      });
    },

    // Clear all tracking data
    clearAll: () => {
      const emptyTracking = { progress: {}, completionsByTransition: {} };
      set(emptyTracking);
      saveToStorage(emptyTracking);
    },

    // Get statistics
    getStats: (tracking: ChallengeTracking) => {
      const totalChallenges = Object.keys(tracking.progress).length;
      const completed = Object.values(tracking.progress).filter(p => p.status === 'completed').length;
      const inProgress = Object.values(tracking.progress).filter(p => 
        p.status === 'started' || p.status === 'in-progress'
      ).length;

      return {
        totalChallenges,
        completed,
        inProgress,
        completionRate: totalChallenges > 0 ? Math.round((completed / totalChallenges) * 100) : 0
      };
    }
  };
}

export const challengeTracking = createChallengeTrackingStore();

// Derived stores for common queries
export const challengeStats = derived(
  challengeTracking,
  $tracking => {
    const totalChallenges = Object.keys($tracking.progress).length;
    const completed = Object.values($tracking.progress).filter(p => p.status === 'completed').length;
    const inProgress = Object.values($tracking.progress).filter(p => 
      p.status === 'started' || p.status === 'in-progress'
    ).length;

    return {
      totalChallenges,
      completed,
      inProgress,
      notStarted: Math.max(0, totalChallenges - completed - inProgress),
      completionRate: totalChallenges > 0 ? Math.round((completed / totalChallenges) * 100) : 0
    };
  }
);

// Helper to get status for a specific challenge
export function getChallengeStatus(tracking: ChallengeTracking, challengeId: string): ChallengeStatus {
  return tracking.progress[challengeId]?.status || 'not-started';
}

// Helper to get progress for a specific challenge
export function getChallengeProgress(tracking: ChallengeTracking, challengeId: string): ChallengeProgress | null {
  return tracking.progress[challengeId] || null;
}

// Helper to calculate completion percentage for a transition
export function getTransitionCompletion(
  tracking: ChallengeTracking, 
  transition: string,
  totalChallengesInTransition: number
): number {
  const completed = tracking.completionsByTransition[transition] || 0;
  return totalChallengesInTransition > 0 
    ? Math.round((completed / totalChallengesInTransition) * 100) 
    : 0;
}
