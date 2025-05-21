export interface Permission {
    name: string;
    description: string;
    route: string;
    acceptedMethods: string[];
    createdOn: Date;
    lastUpdatedOn: Date;
    roles: string[];
}
