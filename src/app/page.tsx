import Playlistcard from "@/components/Playlistcard";

export default function Home() {
  return (
    <>
      <div className="content-wrapper px-[2.4rem] mt-10">
        <div className="header font-[600] text-[1.2rem] flex justify-center ">Your Lists</div>
        <div className="list-grid flex justify-center flex-wrap mt-6 gap-y-10 gap-x-5 w-full">
          {[1, 2, 3,,4,5,6,,7,78,8,2,3,23,321].map(() => (
            <Playlistcard></Playlistcard>
          ))}
        </div>
      </div>
    </>
  );
}
