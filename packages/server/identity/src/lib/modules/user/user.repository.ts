import { EntryService, FindPayload, Transaction } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { User } from './user.schema';

/**
 * Repository class for handling user-related database operations
 */
@injectable()
export class UserRepository {
    /**
     * Creates an instance of UserRepository
     * @param entryService - Service for database entry operations
     */
    constructor(private readonly entryService: EntryService) {}

    /**
     * Creates a new user in the database
     * @param userDto - The user data to create, excluding system fields
     * @param transaction - The database transaction to use
     * @returns {Promise<User>} The created user
     */
    async create(
        userDto: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'projects' | 'roles'>,
        transaction: Transaction
    ): Promise<User> {
        return await this.entryService.create<User>({
            schema: 'Users',
            values: userDto,
            transaction
        });
    }

    /**
     * Associates a role with a user
     * @param userId - The ID of the user
     * @param roleId - The ID of the role to associate
     * @param transaction - The database transaction to use
     * @returns {Promise<any>} The created user-role association
     */
    async addRole(userId: string, roleId: string, transaction: Transaction): Promise<void> {
        await this.entryService.create({
            schema: 'UserRoles',
            values: { userId, roleId },
            transaction
        });
    }

    /**
     * Finds a user by their associated role slug
     * @param slug - The role slug to search for
     * @returns {Promise<User | null>} The found user or null if not found
     */
    async findByRoleSlug(slug: string): Promise<User | null> {
        return await this.entryService.findOne<User>({
            schema: 'Users',
            include: [
                {
                    association: 'Roles',
                    where: {
                        slug
                    }
                }
            ]
        });
    }

    /**
     * Finds a user by their email
     * @param email - The email to search for
     * @returns {Promise<User | null>} The found user or null if not found
     */
    async findByEmail(email: string): Promise<User | null> {
        return await this.entryService.findOne<User>({
            schema: 'Users',
            where: { email }
        });
    }

    /**
     * Finds a user by their ID
     * @param id - The ID of the user
     * @returns {Promise<User | null>} The found user or null if not found
     */
    async findById(id: string): Promise<User | null> {
        return await this.entryService.findOne<User>({
            schema: 'Users',
            where: { id }
        });
    }

    /**
     * Finds all users with pagination
     * @param findOptions - The options for finding users
     * @returns {Promise<{ count: number, users: User[] }>} The count and users
     */
    async findAllPaginated(findOptions: Omit<FindPayload<User>, 'schema'>): Promise<{ count: number; users: User[]; }> {
        const count = await this.entryService.count<User>({
            ...findOptions,
            schema: 'Users',
        });

        const users = await this.entryService.find<User>({
            ...findOptions,
            schema: 'Users',
        });

        return { count, users };
    }
}
