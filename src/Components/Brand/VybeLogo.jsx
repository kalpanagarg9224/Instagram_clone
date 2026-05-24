import React from "react";

const VybeLogo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">

      {/* LOGO BOX */}
      <div className="relative w-12 h-12 rounded-2xl overflow-hidden">

        {/* glow ring */}
        <div className="
          absolute inset-[-6px]
          bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
          rounded-2xl blur-md opacity-70
          animate-[spin_6s_linear_infinite]
        " />

        {/* inner glow */}
        <div className="
          absolute inset-0
          bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30
          blur-xl animate-pulse
        " />

        {/* glass base */}
        <div className="
          absolute inset-1 rounded-2xl
          bg-black/40 backdrop-blur-xl
          border border-white/10
        " />

        {/* V shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-6 h-6">

            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-pink-400 to-transparent rotate-[20deg]" />
            <div className="absolute right-0 top-0 w-[3px] h-full bg-gradient-to-b from-blue-400 to-transparent -rotate-[20deg]" />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* TEXT */}
      <div className="leading-none">
        <div className="text-[22px] font-black tracking-[4px]">
          <span className="text-white">V</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            YBE
          </span>
        </div>
        <div className="text-[10px] tracking-[6px] text-gray-400 uppercase mt-[2px]">
          feel the vibe
        </div>
      </div>
    </div>
  );
};

export default VybeLogo;