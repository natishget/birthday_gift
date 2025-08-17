"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  GraduationCap,
  Music,
  MicOffIcon as MusicOff,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RomanticBirthdayPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // When musicPlaying changes → play or pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked, wait for user interaction", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        window.innerWidth < 1024 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const nextSection = () => {
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (isMobile) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">💻</div>
          <h1 className="text-2xl font-bold mb-4 text-primary font-[family-name:var(--font-space-grotesk)]">
            This gift is too special for small screens
          </h1>
          <p className="text-lg text-foreground/80 font-[family-name:var(--font-dm-sans)]">
            Please open it on a PC ❤️
          </p>
          <div className="mt-8 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="text-primary/60 mx-1 float-animation"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hidden audio element (no controls) */}
      <audio ref={audioRef} src="/music.m4a" loop />
      {/* Background Music Toggle */}
      <Button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed top-4 right-4 z-50 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm"
        size="sm"
      >
        {musicPlaying ? (
          <Music className="h-4 w-4" />
        ) : (
          <MusicOff className="h-4 w-4" />
        )}
      </Button>

      {/* Navigation */}
      {currentSection > 0 && (
        <Button
          onClick={prevSection}
          className="fixed top-4 left-4 z-50 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Section Transitions */}
      <div className="transition-all duration-1000 ease-in-out">
        {currentSection === 0 && <HeroSection onNext={nextSection} />}
        {currentSection === 1 && <OurStorySection onNext={nextSection} />}
        {currentSection === 2 && (
          <LoveLetterSection
            onConfetti={triggerConfetti}
            showConfetti={showConfetti}
          />
        )}
      </div>
    </div>
  );
}

function HeroSection({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col ${
              i % 2 === 0 ? "slide-up" : "slide-down"
            }`}
            style={{ animationDelay: `${i * 2}s` }}
          >
            {[...Array(15)].map((_, j) => (
              <div
                key={j}
                className="w-full bg-gradient-to-br from-primary/30 to-accent/30 mb-4 rounded-lg"
              >
                <Image
                  src={`/placeholder${i % 2 === 0 ? j + 1 : 15 - j}.jpg`}
                  alt="our images"
                  width={1000} // intrinsic width
                  height={200} // intrinsic height (aspect ratio preserved)
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <h1 className="font-bold text-6xl md:text-8xl mb-8 glow-text font-[family-name:var(--font-space-grotesk)]">
          Happy Birthday, Tentua 💖
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-foreground/80 leading-relaxed font-[family-name:var(--font-dm-sans)]">
          The most beautiful part of my story will always be you.
        </p>

        <Button
          onClick={onNext}
          size="lg"
          className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Next
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {[...Array(15)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-accent sparkle-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function OurStorySection({ onNext }: { onNext: () => void }) {
  const timelineEvents = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Our Birthdays",
      description: "August babies, meant to be",
      detail: "Me: August 24, 2001 • Her: August 18, 2002",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "We Met at University",
      description: "Same Computer Science class - where our love story began",
      detail:
        "Different worlds that collided beautifully in the same classroom",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "From Berqe to Tentua",
      description: "The nickname that changed everything",
      detail: "At first 'Berqe', then 'Tentua' - and she loved it",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Our Journey Together",
      description: "Through all the ups and downs",
      detail:
        "Fun times, disagreements, breakups, still hanging out, supporting each other, driving license, first time taking her car, sadness, happiness",
    },
  ];

  return (
    <div className="h-screen overflow-y-auto p-8 bg-gradient-to-br from-card/50 to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-primary font-[family-name:var(--font-space-grotesk)]">
          Our Story
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <Card
                key={index}
                className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 float-animation"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-space-grotesk)]">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-2 font-[family-name:var(--font-dm-sans)]">
                      {event.description}
                    </p>
                    <p className="text-sm text-foreground/70 font-[family-name:var(--font-dm-sans)]">
                      {event.detail}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="font-semibold text-lg mb-4 text-primary font-[family-name:var(--font-space-grotesk)]">
                What We Want From Each Other
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-[family-name:var(--font-dm-sans)]">
                <div>
                  <p className="font-medium mb-2">What she wants from me:</p>
                  <p className="text-muted-foreground">
                    Love, understanding, and being there for her
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">What I want from her:</p>
                  <p className="text-muted-foreground">
                    Her happiness and that beautiful smile
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <h3 className="font-semibold text-lg mb-4 text-primary font-[family-name:var(--font-space-grotesk)]">
                What We Like About Each Other
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-[family-name:var(--font-dm-sans)]">
                <div>
                  <p className="font-medium mb-2">What I like about her:</p>
                  <p className="text-muted-foreground">
                    Her strength, her heart, how she makes everything better and{" "}
                    <strong>emesuan ena tutuan</strong>
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">What she likes about me:</p>
                  <p className="text-muted-foreground">
                    My care, dedication, how I am obessed with her and{" "}
                    <strong>kulayen ena ejen</strong>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/30 to-card border-secondary/20">
              <h3 className="font-semibold text-lg mb-4 text-primary font-[family-name:var(--font-space-grotesk)]">
                How We Want Each Other to Dress
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-[family-name:var(--font-dm-sans)]">
                <div>
                  <p className="font-medium mb-2">How she wants me to dress:</p>
                  <p className="text-muted-foreground">
                    Smart, confident, and old money
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">How I want her to dress:</p>
                  <p className="text-muted-foreground">
                    Sun dress and wearing nothing
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center pb-8">
          <Button
            onClick={onNext}
            size="lg"
            className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoveLetterSection({
  onConfetti,
  showConfetti,
}: {
  onConfetti: () => void;
  showConfetti: boolean;
}) {
  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center p-8 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/10 relative">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full sparkle-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating stardust */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-accent/40 rounded-full float-animation"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      <div className="max-w-4xl w-full">
        <Card className="p-12 bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-space-grotesk)]">
              Love Letter
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none text-foreground font-[family-name:var(--font-dm-sans)] leading-relaxed">
            <p className="mb-6 text-lg italic">My Dearest Tentua,</p>

            <p className="mb-6">
              From the first time I saw you in class, until this very moment,
              you've been my most beautiful story. You made me laugh, you held
              me when I was sad, you stood by me when I needed you.
            </p>

            <p className="mb-6">
              Even after all our ups and downs, you remain unforgettable in my
              heart.
            </p>

            <p className="mb-8">
              On your birthday, I want you to know that I'll always cherish you,
              always wish the best for you, and always remember my Tentua with
              love.
            </p>

            <div className="text-center mb-8">
              <p className="text-2xl font-bold text-primary mb-6 glow-text font-[family-name:var(--font-space-grotesk)]">
                Happy Birthday, Kibir 💕
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-lg mb-8 text-center">
              <p className="text-xl font-semibold text-primary font-[family-name:var(--font-space-grotesk)] mb-2">
                "No matter where life takes us, you'll always be my most special
                memory."
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={onConfetti}
                size="lg"
                className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🎉 Celebrate
                <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              {/* <Link href="/gallery">
                <Button
                  size="lg"
                  className="ml-5 group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  📷 Gallery
                </Button>
              </Link> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
