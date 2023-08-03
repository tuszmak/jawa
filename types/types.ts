import { getServerSideProps } from "@/pages/recipelist";
import { InferGetServerSidePropsType } from "next";

export type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
