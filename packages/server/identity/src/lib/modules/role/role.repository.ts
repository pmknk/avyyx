import { EntryService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { Role } from "./role.schema";

/**
 * Repository class for handling role-related database operations
 */
@injectable()
export class RoleRepository {
    /**
     * Creates an instance of RoleRepository
     * @param entryService - Service for database entry operations
     */
    constructor(private readonly entryService: EntryService) {}

    /**
     * Finds a role by its slug
     * @param slug - The slug to search for
     * @returns {Promise<Role | null>} The found role or null if not found
     */
    async findBySlug(slug: string) {
        return await this.entryService.findOne<Role>({
            schema: 'Roles',
            where: { slug }
        });
    }
}