import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-700 mb-4">Users</h1>
      <ul className="space-y-2">
        {data?.map((u: any) => (
          <li key={u.id} className="p-2 border rounded bg-white dark:bg-gray-800">
            {u.fullName} — {u.age} — {u.job} — {u.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
