"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Skeleton } from "@/components/ui/skeleton";

// This function maps skill names to their image paths
const skillsImage = (skill: string) => {
  const skillID = skill.toLowerCase().replace(/\s+/g, "-");

  // Map of known skills to their image paths
  const skillMap: Record<string, string> = {
    javascript: "/skills/javascript.svg",
    typescript: "/skills/typescript.svg",
    react: "/skills/react.svg",
    "next.js": "/skills/nextjs.svg",
    "next js": "/skills/nextjs.svg",
    redux: "/skills/redux.svg",
    prisma: "/skills/prisma.svg",
    mongodb: "/skills/mongodb.svg",
    mysql: "/skills/mysql.svg",
    postgresql: "/skills/postgresql.svg",
    git: "/skills/git.svg",
    tailwind: "/skills/tailwind.svg",
    bootstrap: "/skills/bootstrap.svg",
    figma: "/skills/figma.svg",
    firebase: "/skills/firebase.svg",
    materialui: "/skills/materialui.svg",
    "material-ui": "/skills/materialui.svg",
    html: "/skills/html.svg",
    css: "/skills/css.svg",
    "node.js": "/skills/nodejs.svg",
    "node js": "/skills/nodejs.svg",
    "express.js": "/skills/express.svg",
    "express js": "/skills/express.svg",
    graphql: "/skills/graphql.svg",
    docker: "/skills/docker.svg",
    aws: "/skills/aws.svg",
    vercel: "/skills/vercel.svg",
    netlify: "/skills/netlify.svg",
  };

  return {
    src:
      skillMap[skillID] ||
      `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(skill)}`,
  };
};

export function SkillsMarquee() {
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await res.json();
        if (response.success) {
          setSkills(response.data.skills || []);
        } else {
          setError(response.message || "Failed to fetch skills");
        }
      } catch (error: any) {
        console.error("Error fetching skills:", error);
        setError(error.message || "An error occurred while fetching skills");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full my-12">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-36 h-36 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (error || skills.length === 0) {
    return (
      <div className="w-full my-12 text-center">
        <p className="text-muted-foreground">
          {error || "No skills found. Add some skills to display here."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-12">
      <Marquee
        gradient={false}
        speed={80}
        pauseOnHover={true}
        pauseOnClick={true}
        delay={0}
        play={true}
        direction="left"
      >
        {skills.map((skill, id) => (
          <div
            className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
            key={id}
          >
            <div className="h-full w-full rounded-lg border border-primary bg-white dark:bg-gray-800 shadow-none shadow-gray-50 dark:shadow-gray-900 group-hover:border-primary transition-all duration-500">
              <div className="flex -translate-y-[1px] justify-center">
                <div className="w-3/4">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 p-6">
                <div className="h-8 sm:h-10">
                  <Image
                    src={skillsImage(skill).src || "/placeholder.svg"}
                    alt={skill}
                    width={40}
                    height={40}
                    className="h-full w-auto rounded-lg"
                  />
                </div>
                <p className="text-black dark:text-white text-sm sm:text-lg">
                  {skill}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
