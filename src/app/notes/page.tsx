import { Metadata } from "next";
import Notes from "@/components/Notes";

export const metadata: Metadata = {
  title: "Notes - Drizzle-3-ORM Supabase Nextjs",
  description: "Created by Trae Zeeofor",
};

const pagesNotes = () => {
    return (
      <>
        <Notes />
      </>
    );
};

export default pagesNotes;
