import { useState, useCallback } from 'react';
import { 
  getLearningPaths, 
  getMilestones, 
  getCertifications,
  getPathSteps,
  addPathStep,
  updatePathStep,
  deletePathStep,
  deleteMilestone,
  deleteCertification,
  LearningPath,
  Milestone,
  Certification,
  PathStep
} from '@/data/journey-data';

interface JourneyData {
  learningPaths: LearningPath[];
  milestones: Milestone[];
  certifications: Certification[];
}

export function useLocalJourneyData() {
  const [data, setData] = useState<JourneyData>({
    learningPaths: getLearningPaths(),
    milestones: getMilestones(),
    certifications: getCertifications()
  });

  const refreshData = useCallback(() => {
    setData({
      learningPaths: getLearningPaths(),
      milestones: getMilestones(),
      certifications: getCertifications()
    });
  }, []);

  const createPathStep = useCallback((pathId: string, stepData: Omit<PathStep, 'id' | 'path_id'>) => {
    const newStep = addPathStep(pathId, stepData);
    refreshData();
    return newStep;
  }, [refreshData]);

  const updateStep = useCallback((stepId: string, updates: Partial<PathStep>) => {
    updatePathStep(stepId, updates);
    refreshData();
  }, [refreshData]);

  const removePathStep = useCallback((stepId: string) => {
    deletePathStep(stepId);
    refreshData();
  }, [refreshData]);

  const removeMilestone = useCallback((milestoneId: string) => {
    deleteMilestone(milestoneId);
    refreshData();
  }, [refreshData]);

  const removeCertification = useCallback((certId: string) => {
    deleteCertification(certId);
    refreshData();
  }, [refreshData]);

  const getStepsForPath = useCallback((pathId: string): PathStep[] => {
    return getPathSteps(pathId);
  }, []);

  return {
    data,
    loading: false,
    error: null,
    createPathStep,
    updatePathStep: updateStep,
    deletePathStep: removePathStep,
    deleteMilestone: removeMilestone,
    deleteCertification: removeCertification,
    getPathSteps: getStepsForPath,
    refreshData
  };
}