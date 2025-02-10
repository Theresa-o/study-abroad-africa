import supabase from "../../../utils/supabase/supaBaseClient";

export const studyAbroadStepsService = {
    async getStudyAbroadSteps() {
      const {data, error } = await supabase.from('study_abroad_steps').select('*')
      if (error) throw error;
      return data;
    }
  }