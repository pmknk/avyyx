import { SchemaDefinition } from "@avyyx/server-database";
import { Role } from "../role/role.schema";

export interface Permission {
    id: string;
    action: string;
    resource: string;
    roles: Role[];
}

export const PermissionSchema: SchemaDefinition = {
    name: 'Permissions',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        action: {
            type: 'string',
            nullable: false
        },
        resource: {
            type: 'string',
            nullable: false
        },
        roles: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Roles',
            options: {
                through: 'RolePermissions',
                foreignKey: 'permissionId',
                otherKey: 'roleId'
            }
        },
        permissionGroup: {
            type: 'relation',
            relationType: 'belongsTo',
            target: 'PermissionGroups',
            options: {
                foreignKey: 'permissionGroupId'
            }
        }
    },
    options: {
        indexes: [
            {
                fields: ['action', 'resource'],
                unique: true
            }
        ]
    }
}