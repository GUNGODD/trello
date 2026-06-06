"use client";
import { useUpdateMyPresence } from "@liveblocks/react/suspense";
import CardModalBody from "@/components/CardModalBody";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CardModal() {
  const router = useRouter();
  const params = useParams();
  const updateMyPresence = useUpdateMyPresence();

  function handleBackdropClick() {
    updateMyPresence({ cardId: null });
    router.back();
  }

  useEffect(() => {
    if (params.cardId) {
      updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params]);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-10 backdrop-blur-sm" />
      <div
        className="absolute inset-0 z-20 w-full overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <div className="min-h-screen flex items-start justify-center p-2 md:p-8">
          <div 
            className="w-full max-w-2xl my-4 md:my-8 rounded-lg overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div onClick={(ev) => ev.stopPropagation()}>
              <CardModalBody />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
