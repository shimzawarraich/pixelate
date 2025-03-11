import { describe, it, expect, beforeEach, vi } from 'vitest';
import mongoose from 'mongoose';
import Post from '../model/Post.js';
import User from '../model/User.js';
import {
  getAllPosts,
  getById,
  getByUserId,
  addPost,
  updatePost,
  deletePost
} from '../controllers/post-controller.js';

// Reset mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

describe('Post Controller', () => {
  describe('getAllPosts', () => {
    it('should return all posts with status 200', async () => {
      const samplePosts = [
        { _id: '1', title: 'Post One', description: 'Desc One', user: 'u1' },
        { _id: '2', title: 'Post Two', description: 'Desc Two', user: 'u2' }
      ];
      vi.spyOn(Post, 'find').mockResolvedValue(samplePosts);
      const req = {};
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      await getAllPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ posts: samplePosts });
    });

    it('should handle errors and respond with 500', async () => {
      vi.spyOn(Post, 'find').mockRejectedValue(new Error('Database error'));
      const req = {};
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      await getAllPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unable to get all posts' });
    });
  });

  describe('getById', () => {
    it('should return the post with populated user and status 200', async () => {
      const postId = 'abc123';
      const populatedPost = {
        _id: postId,
        title: 'Test Post',
        description: 'Test Desc',
        user: { _id: 'u1', name: 'John Doe' }
      };
      vi.spyOn(Post, 'findById').mockReturnValue({ populate: vi.fn().mockResolvedValue(populatedPost) });
      const req = { params: { id: postId } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      await getById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ post: populatedPost });
    });

    it('should respond with 404 if post not found', async () => {
      vi.spyOn(Post, 'findById').mockReturnValue({ populate: vi.fn().mockResolvedValue(null) });
      const req = { params: { id: 'notfound' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      await getById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No Post Found' });
    });
  });

  describe('getByUserId', () => {
    it('should return posts for a user with status 200', async () => {
      const userId = 'user123';
      const userPosts = [{ _id: '101', title: 'User Post 1', description: 'Desc 1', user: userId }];
      vi.spyOn(User, 'findById').mockReturnValue({ populate: vi.fn().mockResolvedValue({ _id: userId, posts: userPosts }) });
      const req = { params: { id: userId } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      await getByUserId(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ posts: userPosts });
    });
  });
});
