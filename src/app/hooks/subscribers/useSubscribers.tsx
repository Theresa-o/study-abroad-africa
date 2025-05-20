import { subscribersService } from "@/app/services/subscriberService";
import { useMutation } from "@tanstack/react-query";
import { Database } from "../../../../utils/supabase/database.types";

type SubscribersInsertDataDTO =
  Database["public"]["Tables"]["subscribers"]["Insert"];

export function useSubscribers() {
  return useMutation({
    mutationFn: (subscriber: SubscribersInsertDataDTO) =>
      subscribersService.createSubscribers(subscriber),
  });
}
