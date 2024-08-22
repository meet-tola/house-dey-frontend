import React from "react";
import { HomeIcon } from "lucide-react";

const NoPropertiesFound = () => {
  return (
    <div className="w-full max-w-md mx-auto h-[400px]">
      <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
        <div className="rounded-full bg-muted p-3">
          <HomeIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          No properties found
        </h2>
        <p className="text-sm text-muted-foreground">
          We couldn't find any properties matching your search criteria. Try
          adjusting your filters or add a new property.
        </p>
      </div>
    </div>
  );
};

export default NoPropertiesFound;
