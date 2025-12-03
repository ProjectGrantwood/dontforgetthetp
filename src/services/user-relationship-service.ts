import {
  findRelationship,
  createUserRelationship,
  updateUserRelationship,
  deleteUserRelationship,
} from "@/db/data-access/user-relationship-access";
import { UserRelationshipStatus, UserRelationship } from "@/types/entities";

export async function getUserRelationshipService(
  sendingUserId: string,
  receivingUserId: string,
) {
  const userRelationship = await findRelationship(
    sendingUserId,
    receivingUserId,
  );
  return userRelationship;
}

export async function usersHaveRelationshipService(
  sendingUserId: string,
  receivingUserId: string,
) {
  const userRelationship: UserRelationship[] = await getUserRelationshipService(
    sendingUserId,
    receivingUserId,
  );
  return userRelationship.length > 0;
}

export async function initiateFriendRequestService(
  sendingUserId: string,
  receivingUserId: string,
) {
  if (sendingUserId === receivingUserId) {
    throw new Error("You cannot friend yourself");
  }

  const existingUserRelationship: UserRelationship[] = await findRelationship(
    sendingUserId,
    receivingUserId,
  );

  if (existingUserRelationship.length > 0) {
    const status: UserRelationshipStatus = existingUserRelationship[0].status;
    const actingUserId = existingUserRelationship[0].user_initiating_action_id;

    if (status === "accepted") {
      throw new Error("You are already friends");
    }

    if (status === "blocked") {
      if (actingUserId === receivingUserId) {
        throw new Error("Cannot send request");
      } else if (actingUserId === sendingUserId) {
        throw new Error("Cannot make requests to blocked users");
      }
    }

    if (status === "pending") {
      if (actingUserId === sendingUserId) {
        throw new Error("Already sent a friend request to this user");
      } else if (actingUserId === receivingUserId) {
        throw new Error("Already received friend request from this user");
      }
    }
  }

  const pendingFriendRequest = await createUserRelationship(
    sendingUserId,
    receivingUserId,
    "pending",
  );

  return pendingFriendRequest;
}

export async function blockUserService(
  sendingUserId: string,
  receivingUserId: string,
) {
  if (sendingUserId === receivingUserId) {
    throw new Error("You cannot block yourself"); // but maybe you should
  }

  const existingUserRelationship: UserRelationship[] = await findRelationship(
    sendingUserId,
    receivingUserId,
  );

  if (existingUserRelationship.length > 0) {
    const status: UserRelationshipStatus = existingUserRelationship[0].status;
    const actingUserId = existingUserRelationship[0].user_initiating_action_id;

    if (status === "blocked") {
      if (actingUserId === sendingUserId) {
        throw new Error("You have already blocked this user");
      }
      if (actingUserId === receivingUserId) {
        throw new Error("Could not complete request");
      }
    }

    return updateUserRelationship(sendingUserId, receivingUserId, "blocked");
  }

  return createUserRelationship(sendingUserId, receivingUserId, "blocked");
}

export async function unblockUserService(
  sendingUserId: string,
  receivingUserId: string,
) {
  const existingUserRelationship: UserRelationship[] = await findRelationship(
    sendingUserId,
    receivingUserId,
  );

  if (existingUserRelationship.length > 0) {
    const status: UserRelationshipStatus = existingUserRelationship[0].status;

    const actingUserId = existingUserRelationship[0].user_initiating_action_id;
    if (status !== "blocked") {
      throw new Error("User is not blocked");
    }
    if (status === "blocked") {
      if (actingUserId !== sendingUserId) {
        throw new Error("Could not complete request");
      }
      const prevStatus = existingUserRelationship[0].prev_status;
      // if the users weren't previously associated before the block, delete the relationship
      if (prevStatus === null) {
        return deleteUserRelationship(sendingUserId, receivingUserId);
      }
      // if the users were friends before the block, set them back to being friends
      if (prevStatus === "accepted") {
        return updateUserRelationship(
          sendingUserId,
          receivingUserId,
          "accepted",
        );
      }
    }
  }
}
