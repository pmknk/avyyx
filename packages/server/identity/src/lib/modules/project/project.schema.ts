import { SchemaDefinition } from '@avyyx/server-database';
import { User } from '../user/user.schema';

export type Project = {
    id: string;
    slug: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    users: User[];
};

export const ProjectSchema: SchemaDefinition = {
    name: 'Projects',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        slug: {
            type: 'string',
            nullable: false,
            unique: true
        },
        name: {
            type: 'string',
            nullable: false,
            unique: true
        },
        description: {
            type: 'string',
            nullable: true
        },
        users: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Users',
            options: {
                through: 'ProjectUsers',
                foreignKey: 'projectId',
                otherKey: 'userId'
            }
        }
    },
    options: {
        paranoid: true,
        timestamps: true
    }
};
