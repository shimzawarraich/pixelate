import { describe, it, expect, beforeEach, vi } from "vitest";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import { getAllUser, signup, login } from "../controllers/user-controller.js";

// Reset mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("User Controller", () => {
  describe("getAllUser", () => {
    it("should return all users with status 200", async () => {
      const sampleUsers = [
        { _id: "1", name: "Alice", email: "alice@example.com", posts: [] },
        { _id: "2", name: "Bob", email: "bob@example.com", posts: [] },
      ];

      vi.spyOn(User, "find").mockResolvedValue(sampleUsers);

      const req = {};
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await getAllUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ users: sampleUsers });
    });

    it("should handle errors and respond with 500", async () => {
      vi.spyOn(User, "find").mockRejectedValue(new Error("Database error"));

      const req = {};
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await getAllUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving users" });
    });

    it("should respond with 404 if no users are found", async () => {
      vi.spyOn(User, "find").mockResolvedValue([]);

      const req = {};
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await getAllUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No Users Found" });
    });
  });

  describe("signup", () => {
    it("should create a new user and return status 201", async () => {
      const req = { body: { name: "John", email: "john@example.com", password: "123456" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      vi.spyOn(User, "findOne").mockResolvedValue(null);
      vi.spyOn(User.prototype, "save").mockResolvedValue();

      vi.spyOn(bcrypt, "hashSync").mockReturnValue("hashedPassword");

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.hashSync).toHaveBeenCalledWith("123456", 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
        user: expect.objectContaining({
          name: "John",
          email: "john@example.com",
          password: "hashedPassword",
          posts: [],
        }),
      });
    });

    it("should respond with 400 if the user already exists", async () => {
      const existingUser = { _id: "1", email: "john@example.com" };
      vi.spyOn(User, "findOne").mockResolvedValue(existingUser);

      const req = { body: { name: "John", email: "john@example.com", password: "123456" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User Already Exists! Login Instead" });
    });

    it("should handle database errors with 500", async () => {
      vi.spyOn(User, "findOne").mockRejectedValue(new Error("Database error"));

      const req = { body: { name: "John", email: "john@example.com", password: "123456" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error checking existing user" });
    });
  });

  describe("login", () => {
    it("should return status 200 and success message if login is successful", async () => {
      const req = { body: { email: "john@example.com", password: "123456" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      const user = { _id: "1", email: "john@example.com", password: "hashedPassword" };
      vi.spyOn(User, "findOne").mockResolvedValue(user);
      vi.spyOn(bcrypt, "compareSync").mockReturnValue(true);

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.compareSync).toHaveBeenCalledWith("123456", "hashedPassword");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login Successful",
        user: user,
      });
    });

    it("should return 404 if the user is not found", async () => {
      vi.spyOn(User, "findOne").mockResolvedValue(null);

      const req = { body: { email: "unknown@example.com", password: "123456" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Couldn't Find User By This Email" });
    });

    it("should return 400 if the password is incorrect", async () => {
      const req = { body: { email: "john@example.com", password: "wrongpassword" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      const user = { _id: "1", email: "john@example.com", password: "hashedPassword" };
      vi.spyOn(User, "findOne").mockResolvedValue(user);
      vi.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Incorrect Password" });
    });

    it("should handle errors and respond with 500", async () => {
      vi.spyOn(User, "findOne").mockRejectedValue(new Error("Database error"));

      const req = { body: { email: "john@example.com", password: "123456" } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error checking user" });
    });
  });
});
