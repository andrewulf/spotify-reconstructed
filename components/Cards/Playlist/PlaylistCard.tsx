import { Playlist } from "@.types/spotify";
import Image from "next/image";
import Link from "next/link";

export default function PlaylistCard({
  name,
  description,
  images,
  id,
}: Pick<Playlist, "name" | "description" | "images" | "id">) {
  return (
    <Link href={`dashboard/playlist/${id}`} key={id}>
      <div className="p-4 text-sm rounded-md bg-grack-800 w-[200px] hover:bg-zinc-800/60 hover:cursor-pointer">
        <Image
          src={images[0].url}
          width={200}
          height={200}
          alt={name}
          className="rounded-md"
        />
        <div className="flex flex-col gap-1 mt-2">
          <p className="font-bold">{name}</p>
          <p className="text-xs opacity-60 line-clamp-2 font-inter">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
