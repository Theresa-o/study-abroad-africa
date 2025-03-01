import supabase from "../../../utils/supabase/supaBaseClient";
import { CreateCourseDTO } from "../types/courses/courses";

export const categoryService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('course_categories')
      .select('*');
    if (error) throw error;
    return data;
  }
};

// services/tagService.ts
export const tagService = {
  async getTags() {
    const { data, error } = await supabase
      .from('course_tags')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getCoursesByTag(tagId: number) {
    const { data, error } = await supabase
      .from('Courses')
      .select(`
        *,
        institution:institution_id(institution_name),
        category:category_id(category_name),
        course_m2m_tags!inner(
          tag_id
        )
      `)
      .eq('course_m2m_tags.tag_id', tagId);
    
    if (error) throw error;
    return data;
  }
};

export const institutionService = {
  async getInstitutions() {
    const {data, error } = await supabase.from('Institution').select('*')
    if (error) throw error;
    return data;
  }
}

export const courseService = {
  async createCourse(courseData: CreateCourseDTO) {
    const { data: course, error: courseError } = await supabase
      .from('Courses')
      .insert({
        title: courseData.title,
        description: courseData.description,
        image: courseData.image,
        category_id: courseData.category_id,
        institution_id: courseData.institution_id
      })
      .select()
      .single();

    if (courseError) throw courseError;

    const tagRelations = courseData.tags.map(tagId => ({
      course_id: course.id,
      tag_id: tagId
    }));

    const { error: tagError } = await supabase
      .from('course_m2m_tags')
      .insert(tagRelations);

    if (tagError) throw tagError;
    return course;
  },

  async getCourses() {
    const { data, error } = await supabase
      .from('Courses')
      .select(`
        *,
        institution:institution_id(institution_name),
        category:category_id(category_name),
        course_tags:course_m2m_tags(tag_id)
      `);

    if (error) throw error;
    return data;
  }
};
