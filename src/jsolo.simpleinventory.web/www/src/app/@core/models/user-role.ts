export interface UserRole {
    name: string;
    description: string;
    hasAdminRights: boolean;
    createdOn: Date;
    lastUpdatedOn?: Date;
    userCount: number;
    permissions: string[];
}
