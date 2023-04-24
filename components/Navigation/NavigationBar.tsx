"use client";
import UserServices from "@.services/user.services";
import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useUserStore } from "@.store/user";
import { useRouter } from "next/navigation";

function NavigationBar() {
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <div className="absolute z-50 w-full h-[75px] flex items-center justify-between px-8">
      <UserServices />
      <div className="flex items-center gap-2 ">
        <span
          className="bg-white/10 rounded-full p-2 h-fit w-fit cursor-pointer dark:bg-zinc-900 hover:bg-zinc-800"
          onClick={() => router.back()}
        >
          <ChevronLeft size={18} />
        </span>
        <span
          className="bg-white/10 rounded-full p-2 h-fit w-fit cursor-pointer dark:bg-zinc-900 hover:bg-zinc-800"
          onClick={() => router.forward()}
        >
          <ChevronRight size={18} />
        </span>
      </div>
      <span className="flex items-center justify-start gap-2 transition-all rounded-full cursor-pointer dark:bg-zinc-900 hover:bg-zinc-800 p-1">
        {user && (
          <Image
            src={user?.images[0]?.url}
            height={30}
            width={30}
            alt={user?.email}
            className="rounded-full"
            priority
          />
        )}
        {user && (
          <p className="flex items-center text-sm font-medium gap-2">
            {user.display_name}
            {<IconChevronDown size={18} className="mr-2" />}
          </p>
        )}
      </span>
    </div>
  );
}
export default NavigationBar;
