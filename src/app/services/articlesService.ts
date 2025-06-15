import supabase from "../../../utils/supabase/supaBaseClient";
import { ArticleInsertDataDTO } from "../types/articles/articles";

export const articleService = {
    async createArticles (ArticleData: ArticleInsertDataDTO & {tagIds: number[]}) {
        const {data: blogTab, error: blogTabError} = await supabase
            .from('articles')
            .insert({
                author: ArticleData.author,
                category_id: ArticleData.category_id,
                content: ArticleData.description,
                country_id: ArticleData.country_id,
                created_at: ArticleData.created_at,
                id: ArticleData.id,
                image: ArticleData.image,
                slug: ArticleData.slug,
                title: ArticleData.title
            })
            .select()
            .single()

        if (blogTabError) throw blogTabError;

        if (ArticleData.tagIds && ArticleData.tagIds.length > 0){
            const articleTagsRelation = ArticleData.tagIds.map(tagId => ({
                article_id: blogTab.id,
                articles_tags_id: tagId
            }))


        const {error: articleTagsError} = await supabase
            .from('articles_m2m_articles_tags')
            .insert(articleTagsRelation)

        if (articleTagsError) throw articleTagsError
      
        }

        return blogTab
    },

    async getArticles() {
        const {data, error} = await supabase    
            .from("articles")
            .select(`*,
                country:country_id(country),
                category:category_id(category_name),
                articles_tags:articles_m2m_articles_tags(articles_tags_id)
                `
            );
        if (error) throw error
        return data
    },

    async getArticleBySlug(slug: string) {
        const {data, error} = await supabase
            .from("articles")
            .select(`*,
                country:country_id(country),
                category:category_id(category_name),
                articles_tags:articles_m2m_articles_tags(articles_tags_id)
                `
            )
            .eq("slug", slug)
            .single();
        
            if (error)  {    
            if (error.code === 'PGRST116') {
                return null; 
            } throw error;
            }
                return data;
            }
    
}

 