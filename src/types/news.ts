export interface News {
    id?: number;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
    links: string[];
    date: Date;
    views: number;
    likes: number;
}
