export interface createScholarshipDTO {
        created_at: string;
        creator_name: string;
        deadline_date: string;
        funding_amount: string;
        id: number;
        image: string;
        published_date: string;
        scholarship_description: string;
        scholarship_name: string;
        website: string;
        destinations: number[];
        categories: number[];
}