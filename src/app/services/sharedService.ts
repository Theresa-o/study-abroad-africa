import supabase from "../../../utils/supabase/supaBaseClient";

export const categoryService = { 
 async getCategories() {
    const { data, error } = await supabase
      .from('course_categories')
      .select('*');
    if (error) throw error;
    return data;
  }
};

export const tagService = {
  async getTags() {
    const { data, error } = await supabase
      .from('course_tags')
      .select('*');
    if (error) throw error;
    return data;
  },
}