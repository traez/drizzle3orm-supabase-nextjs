import { Metadata } from "next";
import UsersPosts from "@/components/UsersPosts";

export const metadata: Metadata = {
  title: "UsersPosts - Drizzle-3-ORM Supabase Nextjs",
  description: "Created by Trae Zeeofor",
};

const pagesUsersPosts = () => {
 return (
   <>
     <UsersPosts />
   </>
 );
};

export default pagesUsersPosts;
