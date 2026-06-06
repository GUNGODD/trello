"use client";
import DescriptionEditor from "@/components/DescriptionEditor";
import { useParams } from "next/navigation";

export default function CardDescription() {
  const { cardId } = useParams();

  return (
    <div>
      <DescriptionEditor cardId={cardId.toString()} />
    </div>
  );
}
