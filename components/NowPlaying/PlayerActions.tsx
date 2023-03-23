import { IconDeviceSpeaker, IconMicrophone } from "@tabler/icons-react";
import { Volume2 } from "react-feather";

const PlayerActions = ({ playback }) => {
  return (
    <section className="gap-2  flex grow items-center justify-end right-0">
      <IconMicrophone size={20} className="opacity-70" />
      <IconDeviceSpeaker size={20} className="opacity-70" />

      <div className="flex gap-4 text-xs items-center">
        <Volume2 size={20} className="opacity-70" />
        <div className="h-[5px] w-[100px] bg-neutral-200 dark:bg-neutral-600 rounded-md">
          <div
            className="h-[5px] bg-white rounded-md transition-all"
            style={{
              width: `${playback?.device?.volume_percent}%`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default PlayerActions;
