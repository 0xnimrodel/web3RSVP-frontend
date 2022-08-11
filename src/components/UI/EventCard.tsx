import Link from "next/link";
import Image from "next/image";
import formatTimestamp from "@utils/formatTimestamp";
import { Bytes } from "ethers";

export default function EventCard({ id, name, eventTimestamp, imageUrl }: { id: Bytes, name: string, eventTimestamp: number, imageUrl: string }) {
  return (
    <div className="group relative clickable-card rounded-md hover:bg-slate-800 p-4 hover:scale-105 transition-all">
      <Link href={`/event/${id}`}>
        <a className="clickable-card__link"></a>
      </Link>
      <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden relative group-hover:opacity-75">
        {imageUrl && <Image src={imageUrl} alt="event image" layout="fill" />}
      </div>
      <p className="mt-2 block text-sm text-gray-400">
        {formatTimestamp(eventTimestamp)}
      </p>
      <p className="block text-base font-medium text-gray-100 mt-1">{name}</p>
    </div>
  );
}
