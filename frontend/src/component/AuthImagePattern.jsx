// import React from "react";
// import { MessageSquare } from "lucide-react";

// const AuthImagePattern = ({ title, subtitle }) => {
//   return (
//     <div className="flex items-center justify-center bg-base-200 min-h-screen px-6">
//       <div className="text-center max-w-md space-y-8">
//         {/* Animated Square Boxes */}
//         <div className="grid grid-cols-3 gap-4">
//           {[...Array(9)].map((_, i) => (
//             <div
//               key={i}
//               className={`w-16 h-16 rounded-lg ${
//                 i % 2 === 0
//                   ? "bg-primary animate-pulse"
//                   : "bg-primary/20 hover:bg-primary/30 transition"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Icon with animation */}
//         <div className="flex justify-center">
//           <div className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 transition shadow">
//             <MessageSquare className="w-8 h-8 text-primary" />
//           </div>
//         </div>

//         {/* Title and Subtitle */}
//         <div>
//           <h2 className="text-2xl font-bold text-base-content">{title}</h2>
//           <p className="text-base-content/60">{subtitle}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthImagePattern;





import React from "react";
import { MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/10 to-base-200 flex items-center justify-center p-6 bg-base-200">
      <div className="relative w-full max-w-md text-center space-y-8">
        
        {/* Floating Shapes Background */}
        <div className="inset-0 z-0 flex flex-wrap gap-6 justify-center items-center opacity-40 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`${
                i % 2 === 0
                  ? "w-16 h-16 rounded-xl bg-primary animate-bounce"
                  : "w-10 h-10 rounded-full bg-secondary animate-pulse"
              }`}
              style={{
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
   <br/>
    <br/>
     <br/>
     
        {/* Foreground Content */}
        <div className="relative z-10 space-y-4">
          {/* absolute  */}
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl font-bold text-base-content ">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;