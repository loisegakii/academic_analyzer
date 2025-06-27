export default function Signup() {
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
