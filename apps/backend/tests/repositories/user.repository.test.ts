// apps/backend/tests/repositories/user.repository.test.ts
import {
    updateUserDocument,
    getUserDocument,
    getUserDocumentByEmail,
  } from "../../src/repositories/user.repository";
  
  // Mock Firestore methods
  const setMock = jest.fn();
  const getMock = jest.fn();
  const whereMock = jest.fn();
  const docMock = jest.fn();
  const collectionMock = jest.fn();
  
  jest.mock("../../src/config/firebase.config", () => {
    return {
      db: {
        collection: jest.fn(() => ({
          doc: docMock,
          where: whereMock,
        })),
      },
    };
  });
  
  const { db } = require("../../src/config/firebase.config");
  
  describe("User Repository", () => {
    const userId = "user123";
    const userData = { name: "Alice", email: "alice@example.com" };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should update user document with merged data", async () => {
      docMock.mockReturnValue({ set: setMock });
  
      await updateUserDocument(userId, userData);
  
      expect(db.collection).toHaveBeenCalledWith("USERS");
      expect(docMock).toHaveBeenCalledWith(userId);
      expect(setMock).toHaveBeenCalledWith(userData, { merge: true });
    });
  
    it("should get user document by ID", async () => {
      const getUserMock = jest.fn().mockResolvedValue({
        exists: true,
        data: () => userData,
      });
  
      docMock.mockReturnValue({ get: getUserMock });
  
      const result = await getUserDocument(userId);
  
      expect(db.collection).toHaveBeenCalledWith("USERS");
      expect(docMock).toHaveBeenCalledWith(userId);
      expect(result.data()).toEqual(userData);
    });
  
    it("should get user document by email", async () => {
      const mockDocs = [{ id: "user123", data: () => userData }];
      const getEmailMock = jest.fn().mockResolvedValue({
        empty: false,
        docs: mockDocs,
      });
  
      whereMock.mockReturnValue({ get: getEmailMock });
  
      const result = await getUserDocumentByEmail("alice@example.com");
  
      expect(db.collection).toHaveBeenCalledWith("USERS");
      expect(whereMock).toHaveBeenCalledWith("email", "==", "alice@example.com");
      expect(result.docs[0].data()).toEqual(userData);
    });
  });
  