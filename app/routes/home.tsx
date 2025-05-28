import { trpc } from "~/utils/trpc/react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const data = await trpc.greeting.hello.query({ name: "World" });
  return { data };
};

export default function Home({ loaderData: { data } }: Route.ComponentProps) {
  return <div>{data}</div>;
}
