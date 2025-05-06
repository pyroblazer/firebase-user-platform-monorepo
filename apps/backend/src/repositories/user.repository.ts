//apps/backend/src/repositories/user.repository.ts
import { db } from "../config/firebase.config";

export const updateUserDocument = async (userId: string, data: any) => {
  await db.collection("USERS").doc(userId).set(data, { merge: true });
};

export const getUserDocument = async (userId: string) => {
  return await db.collection("USERS").doc(userId).get();
};

export const getUserDocumentByEmail = async (email: string) => {
  return await db.collection("USERS").where("email", "==", email).get();
};
