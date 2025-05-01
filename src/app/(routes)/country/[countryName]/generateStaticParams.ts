import { destinationService } from "@/app/services/destinationService";

export async function generateStaticParams() {

  const destinations = await destinationService.getDestinations();
 
  return destinations?.map((destination) => ({
    countryName: destination.country.toLowerCase(),
  }))

  
}