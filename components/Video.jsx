import React from "react";

const Video = () => {
  return (
    <section className="w-full py-12 border-b">
      <div className="container px-4 md:px-16">
      <h2 className="text-2xl font-semibold mb-4">See us in action</h2>
        <div className="aspect-video shadow-lg">
          <img
            alt="Placeholder for video content"
            className="rounded-xl object-cover w-full h-full"
            height="400"
            src="/placeholder.svg?height=400&width=600"
            width="600"
          />
        </div>
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Watch our video to learn more about our services.
        </p>
      </div>
    </section>
  );
};

export default Video;
