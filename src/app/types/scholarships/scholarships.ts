export interface createScholarshipDTO {
        created_at: string;
        creator_name: string;
        deadline_date: string;
        funding_amount: string;
        id: number;
        image: string;
        published_date: string;
        description: string;
        title: string;
        url: string;
        destinations: number[];
        categories: number[];
}