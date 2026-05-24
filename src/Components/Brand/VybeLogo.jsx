import React from "react";

const VybeLogo = () => {
  return (

    <div
      className='
      flex items-center gap-4
      group cursor-pointer select-none
      min-w-max
    '
    >

      {/* LOGO BOX */}
      <div
        className='
        relative w-14 h-14
        rounded-2xl
        overflow-hidden
        shrink-0
      '
      >

        {/* ROTATING GLOW */}
        <div
          className='
          absolute inset-[-4px]
          bg-gradient-to-r
          from-pink-500
          via-purple-500
          to-blue-500
          rounded-2xl
          blur-md
          opacity-70
          animate-[spin_6s_linear_infinite]
        '
        />

        {/* INNER GLOW */}
        <div
          className='
          absolute inset-0
          bg-gradient-to-br
          from-pink-500/30
          via-purple-500/30
          to-blue-500/30
          blur-xl
          animate-pulse
        '
        />

        {/* GLASS BASE */}
        <div
          className='
          absolute inset-1
          rounded-2xl
          bg-black/40
          backdrop-blur-xl
          border border-white/10
        '
        />

        {/* V SHAPE */}
        <div className='absolute inset-0 flex items-center justify-center'>

          <div className='relative w-7 h-7'>

            {/* LEFT LINE */}
            <div
              className='
              absolute left-0 top-0
              w-[3px] h-full
              bg-gradient-to-b
              from-pink-400
              to-transparent
              rotate-[20deg]
            '
            />

            {/* RIGHT LINE */}
            <div
              className='
              absolute right-0 top-0
              w-[3px] h-full
              bg-gradient-to-b
              from-blue-400
              to-transparent
              -rotate-[20deg]
            '
            />

            {/* CENTER DOT GLOW */}
            <div
              className='
              absolute bottom-0 left-1/2
              -translate-x-1/2
              w-2 h-2
              bg-purple-400
              rounded-full
              animate-ping
            '
            />

            {/* CENTER DOT */}
            <div
              className='
              absolute bottom-0 left-1/2
              -translate-x-1/2
              w-1.5 h-1.5
              bg-white
              rounded-full
            '
            />

          </div>

        </div>

      </div>

      {/* TEXT */}
      <div className='leading-none'>

        {/* BRAND NAME */}
        <div
          className='
          text-[28px]
          font-black
          tracking-[5px]
          leading-none
          drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]
        '
        >

          <span className='text-white'>
            V
          </span>

          <span
            className='
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-pink-400
            via-purple-400
            to-blue-400
          '
          >
            YBE
          </span>

        </div>

        {/* TAGLINE */}
        <div
          className='
          text-[11px]
          tracking-[5px]
          text-gray-300
          uppercase
          mt-1
          font-medium
        '
        >
          feel the vibe
        </div>

      </div>

    </div>

  );
};

export default VybeLogo;