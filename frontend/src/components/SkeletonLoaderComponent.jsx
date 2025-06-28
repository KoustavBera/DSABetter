import React from "react";

const FixedSkeletonLoader = () => {
  return (
    <div
      className="relative bg-gray-50 overflow-hidden"
      style={{ width: "1400px", height: "600px" }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite ease-in-out;
        }

        .skeleton-box {
          overflow: hidden;
        }
      `}</style>

      {/* Sidebar - Fixed positioning */}
      <div
        className="absolute left-0 top-0 bg-white border-r border-gray-200 skeleton-box"
        style={{ width: "280px", height: "600px" }}
      >
        {/* Logo/Title area */}
        <div className="p-6">
          <div
            className="shimmer rounded mb-4"
            style={{ width: "120px", height: "24px" }}
          ></div>
          <div
            className="shimmer rounded"
            style={{ width: "60px", height: "16px" }}
          ></div>
        </div>

        {/* Sidebar menu items - Fixed spacing */}
        <div className="px-6 space-y-10">
          {/* Dashboard */}
          <div className="flex items-center">
            <div
              className="shimmer rounded mr-3"
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "80px", height: "16px" }}
            ></div>
          </div>

          {/* Questions */}
          <div className="flex items-center">
            <div
              className="shimmer rounded mr-3"
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "70px", height: "16px" }}
            ></div>
          </div>

          {/* Calendar */}
          <div className="flex items-center">
            <div
              className="shimmer rounded mr-3"
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "60px", height: "16px" }}
            ></div>
          </div>

          {/* Analytics */}
          <div className="flex items-center">
            <div
              className="shimmer rounded mr-3"
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "65px", height: "16px" }}
            ></div>
          </div>

          {/* Settings */}
          <div className="flex items-center">
            <div
              className="shimmer rounded mr-3"
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "55px", height: "16px" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content area - Fixed to not overflow */}
      <div
        className="absolute skeleton-box"
        style={{
          left: "300px",
          top: "0",
          width: "1080px",
          height: "600px",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <div
            className="shimmer rounded mb-3"
            style={{ width: "200px", height: "32px" }}
          ></div>
          <div
            className="shimmer rounded mb-8"
            style={{ width: "320px", height: "18px" }}
          ></div>

          {/* Quick actions section */}
          <div
            className="shimmer rounded mb-5"
            style={{ width: "150px", height: "24px" }}
          ></div>

          {/* Action buttons */}
          <div className="flex gap-4 mb-8">
            <div
              className="shimmer"
              style={{ width: "140px", height: "40px", borderRadius: "20px" }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "120px", height: "40px" }}
            ></div>
          </div>

          {/* Daily Revision Stats section */}
          <div
            className="shimmer rounded mb-6"
            style={{ width: "200px", height: "24px" }}
          ></div>
        </div>

        {/* Stats cards - Fixed to fit within container */}
        <div className="flex gap-5">
          {/* Card 1 */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-5 skeleton-box"
            style={{ width: "260px", height: "120px" }}
          >
            <div
              className="shimmer rounded mb-4"
              style={{ width: "140px", height: "16px" }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "40px", height: "32px" }}
            ></div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-5 skeleton-box"
            style={{ width: "260px", height: "120px" }}
          >
            <div
              className="shimmer rounded mb-4"
              style={{ width: "100px", height: "16px" }}
            ></div>
            <div
              className="shimmer rounded"
              style={{ width: "30px", height: "32px" }}
            ></div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-5 skeleton-box"
            style={{ width: "260px", height: "120px" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="shimmer rounded"
                style={{ width: "80px", height: "16px" }}
              ></div>
              <div
                className="shimmer rounded"
                style={{ width: "16px", height: "16px" }}
              ></div>
            </div>
            <div
              className="shimmer rounded"
              style={{ width: "30px", height: "32px" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Profile circle in top right - Fixed position */}
      <div
        className="shimmer rounded-full absolute"
        style={{ top: "20px", right: "60px", width: "40px", height: "40px" }}
      ></div>
    </div>
  );
};

// Alternative pulse version without overflow
const PulseSkeletonLoader = () => {
  return (
    <div
      className="relative bg-gray-50 overflow-hidden"
      style={{ width: "1400px", height: "600px" }}
    >
      {/* Sidebar */}
      <div
        className="absolute left-0 top-0 bg-white border-r border-gray-200"
        style={{ width: "280px", height: "600px" }}
      >
        <div className="p-6">
          <div
            className="h-6 bg-gray-300 rounded animate-pulse mb-4"
            style={{ width: "120px" }}
          ></div>
          <div
            className="h-4 bg-gray-300 rounded animate-pulse"
            style={{ width: "60px" }}
          ></div>
        </div>

        <div className="px-6 space-y-10">
          {[80, 70, 60, 65, 55].map((width, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse mr-3 flex-shrink-0"></div>
              <div
                className="h-4 bg-gray-300 rounded animate-pulse"
                style={{ width: `${width}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className="absolute"
        style={{
          left: "300px",
          top: "0",
          width: "1080px",
          height: "600px",
          padding: "40px 20px",
        }}
      >
        <div className="mb-6">
          <div
            className="h-8 bg-gray-300 rounded animate-pulse mb-3"
            style={{ width: "200px" }}
          ></div>
          <div
            className="h-5 bg-gray-300 rounded animate-pulse mb-8"
            style={{ width: "320px" }}
          ></div>
          <div
            className="h-6 bg-gray-300 rounded animate-pulse mb-5"
            style={{ width: "150px" }}
          ></div>

          <div className="flex gap-4 mb-8">
            <div
              className="h-10 bg-gray-300 rounded-full animate-pulse"
              style={{ width: "140px" }}
            ></div>
            <div
              className="h-10 bg-gray-300 rounded animate-pulse"
              style={{ width: "120px" }}
            ></div>
          </div>

          <div
            className="h-6 bg-gray-300 rounded animate-pulse mb-6"
            style={{ width: "200px" }}
          ></div>
        </div>

        <div className="flex gap-5">
          {[
            { title: 140, value: 40 },
            { title: 100, value: 30 },
            { title: 80, value: 30 },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5"
              style={{ width: "260px", height: "120px" }}
            >
              <div
                className="h-4 bg-gray-300 rounded animate-pulse mb-4"
                style={{ width: `${card.title}px` }}
              ></div>
              <div
                className="h-8 bg-gray-300 rounded animate-pulse"
                style={{ width: `${card.value}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="w-10 h-10 bg-gray-300 rounded-full animate-pulse absolute"
        style={{ top: "20px", right: "60px" }}
      ></div>
    </div>
  );
};

const SkeletonLoaderComponent = () => {
  const [useShimmer, setUseShimmer] = React.useState(true);

  return (
    <div className="p-4">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <FixedSkeletonLoader />
      </div>
    </div>
  );
};

export default SkeletonLoaderComponent;
