import { useState, useMemo } from "react";
import Select from "react-select";

// Sample user data (you'll replace this with data from backend)
const sampleUsers = [
  { name: "Alice", email: "alice@example.com", role: "tourist" },
  { name: "Bob", email: "bob@example.com", role: "tour-guide" },
  { name: "Charlie", email: "charlie@example.com", role: "admin" },
  { name: "David", email: "david@example.com", role: "tourist" },
];

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "tourist", label: "Tourist" },
  { value: "tour-guide", label: "Tour Guide" },
  { value: "admin", label: "Admin" },
];

const ManageUsers = () => {
  const [users] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchRole = selectedRole.value ? user.role === selectedRole.value : true;
      const matchSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchRole && matchSearch;
    });
  }, [searchTerm, selectedRole, users]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Manage Users</h2>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />
        <Select
          options={roleOptions}
          value={selectedRole}
          onChange={setSelectedRole}
          className="w-full md:w-1/3 text-black"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="text-left">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 capitalize">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="3">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
