import { sql } from "@/lib/connections/postgresSql";
import { UserRelationshipStatus, UserRelationship } from "@/types/entities";
import { sortIds } from "@/lib/utils";

export async function findRelationship(
  sendingUserId: string,
  receivingUserId: string,
) {
  const sortedIds = sortIds(sendingUserId, receivingUserId);
  const userRelationships = await sql<UserRelationship[]>`
    SELECT * FROM user_relationships
    WHERE (user_id_1 = ${sortedIds.userId1} AND user_id_2 = ${sortedIds.userId2});
  `;
  return userRelationships;
}

export async function createUserRelationship(
  sendingUserId: string,
  receivingUserId: string,
  status: UserRelationshipStatus,
) {
  const sortedIds = sortIds(sendingUserId, receivingUserId);
  const userRelationships = await sql`
    INSERT INTO user_relationships (user_id_1, user_id_2, status, user_initiating_action_id, created_at, updated_at)
    VALUES ${sortedIds.userId1}, ${sortedIds.userId2}, ${status}, ${sendingUserId}, NOW(), NOW()
    RETURNING *;
      `;
  return userRelationships;
}

export async function updateUserRelationship(
  sendingUserId: string,
  receivingUserId: string,
  status: UserRelationshipStatus,
) {
  const sortedIds = sortIds(sendingUserId, receivingUserId);
  const relationship = await sql`
      UPDATE user_relationships
      SET status = ${status}, prev_status = status, user_initiating_action_id = ${sendingUserId}, prev_initiating_action_id = user_initiating_action_id, updated_at = NOW()
      WHERE user_id_1 = ${sortedIds.userId1} AND user_id_2 = ${sortedIds.userId2}
      RETURNING *;
    `;
  return relationship;
}

export async function deleteUserRelationship(
  sendingUserId: string,
  receivingUserId: string,
) {
  const sortedIds = sortIds(sendingUserId, receivingUserId);
  const deleted = await sql`
      DELETE FROM user_relationships
      WHERE user_id_1 = ${sortedIds.userId1} AND user_id_2 = ${sortedIds.userId2}
      RETURNING *;
    `;
  return deleted;
}
