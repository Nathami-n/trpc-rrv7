import { trpc } from "~/utils/trpc/trpc";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({}: Route.ComponentProps) {
  const greetinQuery = trpc.greeting.hello.useQuery({ name: "Nathan" });
  const mutation = trpc.post.useMutation();
  return (
    <div>
      <div>
        <button
          onClick={async () => {
            const response = await mutation.mutateAsync();

            console.log(response);
          }}
          className="border bg-white rounded-lg p-2 mt-4 ml-5 cursor-pointer"
        >
          Click me
        </button>
      </div>
    </div>
  );
}
