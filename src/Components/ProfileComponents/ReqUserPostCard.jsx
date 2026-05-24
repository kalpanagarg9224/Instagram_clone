const ReqUserPostCard = ({ post }) => {
  return (
    <div className="p-2">
      <div className="relative w-60 h-60 rounded-xl overflow-hidden border border-white/10">

        <img
          className="w-full h-full object-cover"
          src={post?.image}
          alt=""
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-end p-3">

          <div className="flex justify-between w-full text-white text-sm">

            <div className="flex items-center gap-1">
              ❤️ {post?.likedByUsers?.length || 0}
            </div>

            <div className="flex items-center gap-1">
              💬 {post?.comments?.length || 0}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ReqUserPostCard;