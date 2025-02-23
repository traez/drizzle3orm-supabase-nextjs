"use client";
import { useState, useEffect } from "react";
import type { SelectC2Users, SelectC2Posts } from "@/db/schema";

interface NewUser {
  name: string;
  age: string; // Using string for form input
  email: string;
}

interface NewPost {
  title: string;
  content: string;
  userId: string; // Using string for form input
}

const UsersPosts: React.FC = () => {
  const [users, setUsers] = useState<SelectC2Users[]>([]);
  const [posts, setPosts] = useState<SelectC2Posts[]>([]);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    age: "",
    email: "",
  });
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    content: "",
    userId: "",
  });

  const fetchData = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/posts"),
      ]);
      const [usersData, postsData] = await Promise.all([
        usersRes.json(),
        postsRes.json(),
      ]);
      setUsers(usersData);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newUser,
          age: parseInt(newUser.age), // Convert age to number
        }),
      });
      setNewUser({ name: "", age: "", email: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          userId: parseInt(newPost.userId), // Convert userId to number
        }),
      });
      setNewPost({ title: "", content: "", userId: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <section className="min-h-[calc(100vh-91px)] w-full mx-auto p-4 bg-[#d5dee4]">
      <h1 className="mx-auto text-[1.5rem] mb-2 font-extrabold flex justify-center">
        Users and Posts
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Users Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Add New User</h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full p-2 border rounded"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </form>
        </div>

        {/* Posts Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Add New Post</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 border rounded h-24"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
            />
            <select
              className="w-full p-2 border rounded"
              value={newPost.userId}
              onChange={(e) =>
                setNewPost({ ...newPost, userId: e.target.value })
              }
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>

      {/* Display Sections */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Users List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded">
                <h3 className="font-bold">{user.name}</h3>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded">
                <h3 className="font-bold">{post.title}</h3>
                <p className="mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By: {users.find((u) => u.id === post.userId)?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersPosts;