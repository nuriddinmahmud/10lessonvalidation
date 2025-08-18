import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  username: yup.string().required("Username required"),
  password: yup.string().min(6, "Min 6 chars").required("Password required"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("Registered user:", data);
    alert("✅ User Registered!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Register
        </h2>

        <div className="space-y-4">
          <div>
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded bg-green-600 hover:bg-green-700 px-4 py-2 font-bold text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
