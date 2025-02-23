"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaRegTrashAlt, FaPenSquare, FaPlusCircle } from "react-icons/fa";
import { type SelectC2Profiles } from "@/db/schema";

const Profiles = () => {
  const [profiles, setProfiles] = useState<SelectC2Profiles[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<SelectC2Profiles | null>(
    null
  );

  const LoadingSkeleton = () => (
    <div className="bg-[#1B2232] rounded-lg p-4 animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 w-4 bg-gray-700 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  );

  const saveRandomProfile = async (profileData: {
    firstname: string;
    lastname: string;
    username: string;
  }) => {
    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const savedProfile = await response.json();
      console.log(savedProfile);
      toast.success("Profile saved successfully!");
      fetchProfiles();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  const fetchAndSaveRandomProfile = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const profile = {
        firstname: data.results[0].name.first,
        lastname: data.results[0].name.last,
        username: data.results[0].login.username,
      };
      await saveRandomProfile(profile);
    } catch (error) {
      console.error("Error fetching random profile:", error);
      toast.error("Failed to fetch random profile");
    }
  };

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profiles");
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Failed to fetch profiles");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profiles when component mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleEdit = (profile: SelectC2Profiles) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProfile) return;

    try {
      const response = await fetch("/api/profiles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingProfile.id,
          firstname: editingProfile.firstname,
          lastname: editingProfile.lastname,
          username: editingProfile.username,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setShowForm(false);
      setEditingProfile(null);
      fetchProfiles();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleDelete = async (profileId: number) => {
    if (!confirm("Are you sure you want to delete this profile?")) {
      return;
    }

    try {
      const response = await fetch(`/api/profiles?id=${profileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      toast.success("Profile deleted successfully!");
      fetchProfiles(); // Refresh the profiles list
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile");
    }
  };

  return (
    <section className="min-h-[calc(100vh-91px)] w-full flex flex-col text-[#1B2232] bg-[#91c9ef] mx-auto py-4 px-8 sm:px-20">
      <h1 className="mx-auto text-[1.5rem] mb-2 font-extrabold">Profiles</h1>
      {/* Menu - Add profile */}
      <menu className="flex justify-end items-center mb-8 px-4">
        <button
          className="p-2 rounded-full bg-[#1B2232] hover:bg-[#2648ad] transition-colors hover:ring-4 hover:ring-white"
          onClick={fetchAndSaveRandomProfile}
        >
          <FaPlusCircle className="w-6 h-6 text-[white]" />
        </button>
      </menu>

      {/* Edit Profile Form */}
      {showForm && editingProfile && (
        <form
          onSubmit={handleUpdate}
          className="mb-8 bg-[#1B2232] rounded-lg p-4 text-white"
        >
          <input
            type="text"
            placeholder="First Name"
            maxLength={30}
            value={editingProfile.firstname}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                firstname: e.target.value,
              })
            }
            className="w-full mb-4 p-2 bg-[#2D3343] rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            maxLength={30}
            value={editingProfile.lastname}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, lastname: e.target.value })
            }
            className="w-full mb-4 p-2 bg-[#2D3343] rounded"
            required
          />
          <input
            type="text"
            placeholder="Username"
            maxLength={30}
            value={editingProfile.username}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, username: e.target.value })
            }
            className="w-full mb-4 p-2 bg-[#2D3343] rounded"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 p-2 bg-[#2D3343] rounded hover:bg-[#3E4758] transition-colors"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingProfile(null);
              }}
              className="flex-1 p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Notes Grid */}
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-white">
        {isLoading ? (
          // Show 4 loading skeletons while loading
          [...Array(4)].map((_, index) => <LoadingSkeleton key={index} />)
        ) : profiles.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-8">
            No profiles found. Click the + button to add one!
          </div>
        ) : (
          profiles.map((profile) => (
            <aside
              key={profile.id}
              className="bg-[#1B2232] rounded-lg p-4 hover:bg-[#2D3343] transition-colors flex flex-col justify-between"
            >
              <nav className="flex flex-col justify-between mb-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {new Date(profile.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <FaPenSquare
                      className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                      onClick={() => handleEdit(profile)}
                    />
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                    onClick={() => handleDelete(profile.id)}
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-[1rem] text-white">
                    First Name:{" "}
                    <span className="text-[1rem] text-gray-400">
                      {profile.firstname}
                    </span>
                  </p>
                  <p className="text-[1rem] text-white">
                    Last Name:{" "}
                    <span className="text-[1rem] text-gray-400">
                      {profile.lastname}
                    </span>
                  </p>
                  <p className="text-[1rem] text-white">
                    UserName:{" "}
                    <span className="text-[1rem] text-gray-400">
                      {profile.username}
                    </span>
                  </p>
                </div>
              </nav>
              <div className="flex justify-between items-center">
                <b className="text-[#8d8989]">Update:</b>
                <span className="text-sm text-gray-400 flex justify-start items-center">
                  {new Date(profile.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </aside>
          ))
        )}
      </article>

      {/* Menu - Add profile */}
      <menu className="flex justify-end items-center my-8 px-4">
        <button
          className="p-2 rounded-full bg-[#1B2232] hover:bg-[#2648ad] transition-colors hover:ring-4 hover:ring-white"
          onClick={fetchAndSaveRandomProfile}
        >
          <FaPlusCircle className="w-6 h-6 text-[white]" />
        </button>
      </menu>
    </section>
  );
};

export default Profiles;
