import supabase from "../../../utils/supabase/supaBaseClient";
import { CreateCourseDTO } from "../types/courses/courses";

export const courseByTagService = {

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





export const courseService = {
  async createCourse(courseData: CreateCourseDTO) {
    const { data: course, error: courseError } = await supabase
      .from('Courses')
      .insert({
        title: courseData.title,
        description: courseData.description,
        image: courseData.image,
        category_id: courseData.category_id,
        institution_id: courseData.institution_id,
        slug: courseData.slug,
        url: courseData.url,
        location_id: courseData.location_id
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
  },

  // Get a single course by slug
  async getCourseBySlug(slug: string) {
    const { data, error } = await supabase
      .from('Courses')
      .select(`
        *,
        institution:institution_id(institution_name),
        category:category_id(category_name),
        course_tags:course_m2m_tags(tag_id)
      `)
      .eq('slug', slug)        
      .single();       
    
    if (error) {
      // If no course found, Supabase returns an error
      if (error.code === 'PGRST116') {
        return null; 
      }
      throw error;
    }
    
    return data;
  }
};
