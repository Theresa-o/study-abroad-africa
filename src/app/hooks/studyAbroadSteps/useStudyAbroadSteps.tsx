import { studyAbroadStepsService } from "@/app/services/studyAbroadService";
import { useQuery } from "@tanstack/react-query";

export function useStudyAbroadSteps() {
  return useQuery({
    queryKey: ["study_steps"],
    queryFn: studyAbroadStepsService.getStudyAbroadSteps,
  });
}
