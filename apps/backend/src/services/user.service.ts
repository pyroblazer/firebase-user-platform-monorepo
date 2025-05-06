import { getUserDocument, updateUserDocument, getUserDocumentByEmail } from "../repositories/user.repository"
import { ApiError } from "../entities/api-error.entity";

export const updateUserData = async (userId: string, data: any) => {
  await updateUserDocument(userId, data);
  const userDoc = await getUserDocument(userId);
  if (!userDoc.exists) {
    throw new ApiError("User not found", 404);
  }
  return userDoc.data();
};

export const getUserData = async (userId: string) => {
  const userDoc = await getUserDocument(userId);
  if (!userDoc.exists) {
    throw new ApiError("User not found", 404);
  }
  return userDoc.data();
};

export const getUserIdByEmail = async (email: string) => {
  const snapshot = await getUserDocumentByEmail(email);
  if (!snapshot || snapshot.empty) {
    throw new ApiError("User not found", 404);
  }
  return snapshot!.docs[0]!.id;
};
