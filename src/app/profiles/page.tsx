import { Metadata } from "next";
import Profiles from "@/components/Profiles";

export const metadata: Metadata = {
  title: "Profiles - Drizzle-3-ORM Supabase Nextjs",
  description: "Created by Trae Zeeofor",
};

const pagesProfiles = () => {
  return (
    <>
      <Profiles />
    </>
  );
};

export default pagesProfiles;
