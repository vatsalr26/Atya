import { UniversitiesService } from './universities.service';
export declare class UniversitiesController {
    private readonly universitiesService;
    constructor(universitiesService: UniversitiesService);
    findAll(): Promise<{
        id: string;
        name: string;
        country: string;
    }[]>;
    create(data: {
        name: string;
        country: string;
    }): Promise<{
        id: string;
        name: string;
        country: string;
    }>;
}
